import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLLONGLEGGEDDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLLONGLEGGEDDOJI";
    static INDICATOR_DESCR: string = "Long Legged Doji";

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;

    private shadowLongAveragePeriod: number;
    private shadowLongPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLLONGLEGGEDDOJI.INDICATOR_NAME, CDLLONGLEGGEDDOJI.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.shadowLongPeriodTotal = 0;
        this.firstCandle = undefined;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyDojiAveragePeriod, this.shadowLongAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(this.bodyDojiAveragePeriod);

    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.populateCandleVariables();

        if (CandleStickUtils.getRealBody(this.firstCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.firstCandle) &&
            (CandleStickUtils.getLowerShadow(this.firstCandle) >
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.firstCandle)
                ||
                CandleStickUtils.getUpperShadow(this.firstCandle) >
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.firstCandle)
            )
        ) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(this.shadowLongAveragePeriod));
        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, inputData);
        }
    }
}
