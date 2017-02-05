import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLRICKSHAWMAN
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLRICKSHAWMAN";
    static INDICATOR_DESCR: string = "Rickshaw Man";

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;
    private shadowLongPeriodTotal: number;
    private shadowLongAveragePeriod: number;
    private nearPeriodTotal: number;
    private nearAveragePeriod: number;
    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLRICKSHAWMAN.INDICATOR_NAME, CDLRICKSHAWMAN.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.shadowLongPeriodTotal = 0;
        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.nearPeriodTotal = 0;

        this.firstCandle = undefined;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(Math.max(this.bodyDojiAveragePeriod, this.shadowLongAveragePeriod), this.nearAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.populateCandleVariables();

        if (this.candleIsDojiWithLongUpperAndLowerShadowsWithBodyNearMidpoint()) {
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

        this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                this.slidingWindow.getItem(this.nearAveragePeriod));

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

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, inputData);
        }
    }

    private candleIsDojiWithLongUpperAndLowerShadowsWithBodyNearMidpoint() {
        return CandleStickUtils.getRealBody(this.firstCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.firstCandle) &&
            // long shadow
            CandleStickUtils.getLowerShadow(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.firstCandle) &&
            // long shadow
            CandleStickUtils.getUpperShadow(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.firstCandle) &&

            Math.min(this.firstCandle.open, this.firstCandle.close)
            <= this.firstCandle.low + CandleStickUtils.getHighLowRange(this.firstCandle) / 2 +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal, this.firstCandle)
            &&
            Math.max(this.firstCandle.open, this.firstCandle.close)
            >= this.firstCandle.low + CandleStickUtils.getHighLowRange(this.firstCandle) / 2 -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal, this.firstCandle);
    }
}
