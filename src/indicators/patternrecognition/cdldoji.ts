import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLDOJI
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLDOJI";
    static INDICATOR_DESCR: string = "Doji";

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private firstCandle: marketData.PriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLDOJI.INDICATOR_NAME, CDLDOJI.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;

        const lookback = this.bodyDojiAveragePeriod;
        this.slidingWindow = new SlidingWindow<marketData.PriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.populateCandleVariables();

        this.setCurrentValue(this.hasVerySmallRealBody() ? 100 : 0);

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }
    }

    private hasVerySmallRealBody(): boolean {
        return CandleStickUtils.getRealBody(this.firstCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.firstCandle);
    }
}
