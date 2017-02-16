import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class RiseFallThreeMethods
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLRISEFALL3METHODS";
    static INDICATOR_DESCR: string = "Rising/Falling Three Methods";

    private bodyShortAveragePeriod: number;
    private bodyLongAveragePeriod: number;
    private bodyPeriodTotal: number[];

    private fifthCandle: marketData.PriceBar;
    private fourthCandle: marketData.PriceBar;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private fifthCandleColor: candleEnums.CandleColor;
    private fourthCandleColor: candleEnums.CandleColor;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(RiseFallThreeMethods.INDICATOR_NAME, RiseFallThreeMethods.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyPeriodTotal = new Array<number>(5);
        for (let i = 0; i < this.bodyPeriodTotal.length; i++) {
            this.bodyPeriodTotal[i] = 0;
        }

        const lookback = Math.max(this.bodyShortAveragePeriod, this.bodyLongAveragePeriod) + 4;
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

        if (this.firstCandleIsLongFollowedByThreeSmallAndThenALongFifthCandle() &&
            this.firstAndFifthCandleHaveSameColorWithOtherOpposite() &&
            this.secondToFourthCandleBodiesAtLeastPartiallyWithinFirst() &&
            this.secondToFourthAreRisingOrFalling() &&
            this.fifthCandleOpensAboveOrBelowPriorClose() &&
            this.fifthCandleClosesAboveOrBelowFirstClose()) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyPeriodTotal[4] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 4));

        for (let i = 3; i >= 1; i--) {
            this.bodyPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                    this.slidingWindow.getItem(i + this.bodyShortAveragePeriod));
        }

        this.bodyPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(4);
        this.secondCandle = this.slidingWindow.getItem(3);
        this.thirdCandle = this.slidingWindow.getItem(2);
        this.fourthCandle = this.slidingWindow.getItem(1);
        this.fifthCandle = this.slidingWindow.getItem(0);

        this.fifthCandleColor = CandleStickUtils.getCandleColor(this.fifthCandle);
        this.fourthCandleColor = CandleStickUtils.getCandleColor(this.fourthCandle);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples > this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyPeriodTotal[3] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.slidingWindow.getItem(3));
            this.bodyPeriodTotal[2] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.slidingWindow.getItem(2));
            this.bodyPeriodTotal[1] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples > this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyPeriodTotal[4] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(4));
            this.bodyPeriodTotal[0] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }
    }

    private firstCandleIsLongFollowedByThreeSmallAndThenALongFifthCandle() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyPeriodTotal[4], this.firstCandle) &&
            CandleStickUtils.getRealBody(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyPeriodTotal[3], this.secondCandle) &&
            CandleStickUtils.getRealBody(this.thirdCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyPeriodTotal[2], this.thirdCandle) &&
            CandleStickUtils.getRealBody(this.fourthCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyPeriodTotal[1], this.fourthCandle) &&
            CandleStickUtils.getRealBody(this.fifthCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyPeriodTotal[0], this.fifthCandle);
    }

    private firstAndFifthCandleHaveSameColorWithOtherOpposite() {
        return this.firstCandleColor === -this.secondCandleColor &&
            this.secondCandleColor === this.thirdCandleColor &&
            this.thirdCandleColor === this.fourthCandleColor &&
            this.fourthCandleColor === -this.fifthCandleColor;
    }

    private secondToFourthCandleBodiesAtLeastPartiallyWithinFirst() {
        return Math.min(this.secondCandle.open, this.secondCandle.close) < this.firstCandle.high
            && Math.max(this.secondCandle.open, this.secondCandle.close) > this.firstCandle.low &&
            Math.min(this.thirdCandle.open, this.thirdCandle.close) < this.firstCandle.high
            && Math.max(this.thirdCandle.open, this.thirdCandle.close) > this.firstCandle.low &&
            Math.min(this.fourthCandle.open, this.fourthCandle.close) < this.firstCandle.high
            && Math.max(this.fourthCandle.open, this.fourthCandle.close) > this.firstCandle.low;
    }

    private secondToFourthAreRisingOrFalling() {
        return this.thirdCandle.close * this.firstCandleColor < this.secondCandle.close * this.firstCandleColor &&
            this.fourthCandle.close * this.firstCandleColor < this.thirdCandle.close * this.firstCandleColor;
    }

    private fifthCandleOpensAboveOrBelowPriorClose() {
        return this.fifthCandle.open *
            this.firstCandleColor > this.fourthCandle.close * this.firstCandleColor;
    }

    private fifthCandleClosesAboveOrBelowFirstClose() {
        return this.fifthCandle.close *
            this.firstCandleColor > this.fourthCandle.close * this.firstCandleColor;
    }
}

export class CDLRISEFALL3METHODS extends RiseFallThreeMethods {

}
