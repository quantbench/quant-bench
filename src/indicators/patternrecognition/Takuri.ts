import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Takuri
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLTAKURI";
    static INDICATOR_DESCR: string = "Takuri (Dragonfly Doji with very long lower shadow)";

    private bodyDojiAveragePeriod: number;
    private bodyDojiPeriodTotal: number;
    private shadowVeryShortAveragePeriod: number;
    private shadowVeryShortPeriodTotal: number;
    private shadowVeryLongAveragePeriod: number;
    private shadowVeryLongPeriodTotal: number;

    private firstCandle: marketData.PriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(Takuri.INDICATOR_NAME, Takuri.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;
        this.shadowVeryLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryLong).averagePeriod;
        this.shadowVeryLongPeriodTotal = 0;

        const lookback = Math.max(Math.max(this.bodyDojiAveragePeriod, this.shadowVeryShortAveragePeriod),
            this.shadowVeryShortAveragePeriod);
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

        if (CandleStickUtils.getRealBody(this.firstCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getLowerShadow(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryLong,
                this.shadowVeryLongPeriodTotal, this.firstCandle)
        ) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyDojiPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        this.shadowVeryShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod));

        this.shadowVeryLongPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong,
                this.slidingWindow.getItem(this.shadowVeryLongAveragePeriod));
        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.bodyDojiAveragePeriod) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }

        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }

        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.shadowVeryLongAveragePeriod) {
            this.shadowVeryLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong, inputData);
        }
    }
}

export class CDLTAKURI extends Takuri {

}
