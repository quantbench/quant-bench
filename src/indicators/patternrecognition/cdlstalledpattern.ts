import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLSTALLEDPATTERN
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLSTALLEDPATTERN";
    static INDICATOR_DESCR: string = "Stalled Pattern";

    private bodyLongAveragePeriod: number;

    private bodyLongPeriodTotal: number[];

    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;

    private shadowVeryShortAveragePeriod: number;
    private shadowVeryShortPeriodTotal: number;

    private nearAveragePeriod: number;
    private nearPeriodTotal: number[];

    private shadowShortPeriodTotal: number[];

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLSTALLEDPATTERN.INDICATOR_NAME, CDLSTALLEDPATTERN.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.bodyLongPeriodTotal.length; i++) {
            this.bodyLongPeriodTotal[i] = 0;
        }

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;

        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.nearPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.nearPeriodTotal.length; i++) {
            this.nearPeriodTotal[i] = 0;
        }

        const lookback = Math.max(Math.max(
            Math.max(this.bodyLongAveragePeriod, this.bodyShortAveragePeriod),
            Math.max(this.shadowVeryShortAveragePeriod, this.nearAveragePeriod))) + 2;

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

        if (this.firstCandleIsWhite() &&
            this.secondCandleIsWhite() &&
            this.allThreeCandlesHaveConsecutiveHigherCloses() &&
            this.firstCandleHasLongRealBody() &&
            this.secondCandleHasLongRealBodyShortUpperShadowAndOpensWithinFirstRealBody() &&
            this.thirdCandleHasSmallRealBodyAndRidesOnShoulderOfSecondRealBody()) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 2; i >= 1; i--) {
            this.bodyLongPeriodTotal[i] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(i + this.bodyLongAveragePeriod));
            this.nearPeriodTotal[i] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                    this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                    this.slidingWindow.getItem(i + this.nearAveragePeriod));
        }

        this.bodyShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.thirdCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

        this.shadowVeryShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod + 1));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(2);
        this.secondCandle = this.slidingWindow.getItem(1);
        this.thirdCandle = this.slidingWindow.getItem(0);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal[2] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(2));
            this.bodyLongPeriodTotal[1] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal[2] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
            this.nearPeriodTotal[1] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(1));
        }
    }

    private firstCandleIsWhite() {
        return this.firstCandleColor === candleEnums.CandleColor.White;
    }

    private secondCandleIsWhite() {
        return this.secondCandleColor === candleEnums.CandleColor.White;
    }

    private allThreeCandlesHaveConsecutiveHigherCloses() {
        return this.thirdCandle.close > this.secondCandle.close && this.secondCandle.close > this.firstCandle.close;
    }

    private firstCandleHasLongRealBody() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal[2], this.firstCandle);
    }

    private secondCandleHasLongRealBodyShortUpperShadowAndOpensWithinFirstRealBody() {
        return CandleStickUtils.getRealBody(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal[1], this.secondCandle) &&
            CandleStickUtils.getUpperShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.secondCandle) &&
            this.secondCandle.open > this.firstCandle.open &&
            this.secondCandle.open <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[2], this.firstCandle);
    }

    private thirdCandleHasSmallRealBodyAndRidesOnShoulderOfSecondRealBody() {
        return CandleStickUtils.getRealBody(this.thirdCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle) &&
            // rides on the shoulder of 2nd real body
            this.thirdCandle.open >= this.secondCandle.close - CandleStickUtils.getRealBody(this.thirdCandle) -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[1], this.secondCandle);
    }
}
