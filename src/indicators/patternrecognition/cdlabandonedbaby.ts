import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLABANDONEDBABY
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLABANDONEDBABY";
    static INDICATOR_DESCR: string = "Abandoned Baby";

    static PENETRATION_DEFAULT: number = 0.3;
    static PENETRATION_MIN: number = 0;

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;

    private bodyLongPeriodTotal: number;
    private bodyLongAveragePeriod: number;

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private penetration: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor(penetration: number = CDLABANDONEDBABY.PENETRATION_DEFAULT) {
        super(CDLABANDONEDBABY.INDICATOR_NAME, CDLABANDONEDBABY.INDICATOR_DESCR);

        this.penetration = penetration;

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;

        this.bodyLongPeriodTotal = 0;
        this.bodyShortPeriodTotal = 0;
        this.bodyDojiPeriodTotal = 0;

        const lookback = Math.max(Math.max(this.bodyDojiAveragePeriod, this.bodyLongAveragePeriod), this.bodyShortAveragePeriod) + 2;
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

        if (this.firstCandleIsALongCandle() &&
            this.secondCandleIsDoji() &&
            this.thirdCandleIsLongerThanShort() &&
            (this.isBullishAbandondedBaby() || this.isBearishAbandondedBaby())) {
            this.setCurrentValue(this.thirdCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.slidingWindow.getItem(2)) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod - 1));

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.slidingWindow.getItem(1)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod + 1));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(3);
        this.secondCandle = this.slidingWindow.getItem(2);
        this.thirdCandle = this.slidingWindow.getItem(1);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }
    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(2));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod) {
            this.bodyDojiPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }
    }

    private firstCandleIsALongCandle() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsDoji() {
        return CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.secondCandle);
    }

    private thirdCandleIsLongerThanShort() {
        return CandleStickUtils.getRealBody(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle);
    }

    private isBearishAbandondedBaby() {
        // 1st white
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            // 3rd black
            this.thirdCandleColor === candleEnums.CandleColor.Black &&
            // 3rd closes well within 1st rb
            this.thirdCandle.close < this.firstCandle.close - CandleStickUtils.getRealBody(this.firstCandle) * this.penetration &&
            // upside gap between 1st and 2nd
            CandleStickUtils.getCandleGapUp(this.secondCandle, this.firstCandle) &&
            // downside gap between 2nd and 3rd
            CandleStickUtils.getCandleGapDown(this.thirdCandle, this.secondCandle);
    }

    private isBullishAbandondedBaby() {
        // 1st black
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            // 3rd white
            this.thirdCandleColor === candleEnums.CandleColor.White &&
            // 3rd closes well within 1st rb
            this.thirdCandle.close > this.firstCandle.close + CandleStickUtils.getRealBody(this.firstCandle) * this.penetration &&
            // downside gap between 1st and 2nd
            CandleStickUtils.getCandleGapDown(this.secondCandle, this.firstCandle) &&
            // upside gap between 2nd and 3rd
            CandleStickUtils.getCandleGapUp(this.thirdCandle, this.secondCandle);
    }
}
