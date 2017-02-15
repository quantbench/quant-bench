import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class AdvanceBlock
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLADVANCEBLOCK";
    static INDICATOR_DESCR: string = "Advance Block";

    private shadowShortAveragePeriod: number;
    private shadowLongAveragePeriod: number;
    private nearAveragePeriod: number;
    private farAveragePeriod: number;
    private bodyLongAveragePeriod: number;

    private shadowShortPeriodTotal: number[];
    private shadowLongPeriodTotal: number[];
    private nearPeriodTotal: number[];
    private farPeriodTotal: number[];
    private bodyLongPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(AdvanceBlock.INDICATOR_NAME, AdvanceBlock.INDICATOR_DESCR);

        this.shadowShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowShort).averagePeriod;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.farAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Far).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;

        this.shadowShortPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.shadowShortPeriodTotal.length; i++) {
            this.shadowShortPeriodTotal[i] = 0;
        }

        this.shadowLongPeriodTotal = new Array<number>(2);
        for (let i = 0; i < this.shadowLongPeriodTotal.length; i++) {
            this.shadowLongPeriodTotal[i] = 0;
        }

        this.nearPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.nearPeriodTotal.length; i++) {
            this.nearPeriodTotal[i] = 0;
        }

        this.farPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.farPeriodTotal.length; i++) {
            this.farPeriodTotal[i] = 0;
        }

        this.bodyLongPeriodTotal = 0;

        const lookback = Math.max(Math.max(
            Math.max(CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod,
                CandleSettings.get(candleEnums.CandleSettingType.ShadowShort).averagePeriod),
            Math.max(CandleSettings.get(candleEnums.CandleSettingType.Far).averagePeriod,
                CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod)),
            CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod) + 2;

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

        if (this.firstThreeCandlesAreWhiteWithConsecutiveHigherCloses() &&
            this.firstCandleHasALongRealBodyAndShortUpperShadow() &&
            this.secondCandleOpensWithinOrNearFirstCandlesRealBody() &&
            this.thirdCandleOpensWithinOrNearSecondCandlesRealBody() &&
            (
                this.secondCandleIsFarSmallerThanFirstAndThridNotLongerThanSecond() ||
                this.thirdCandleIsFarSmallerThanSecond() ||
                (
                    this.thirdCandleIsSmallerThanSecondAndSecondSmallerThanFirst() &&
                    this.thirdOrSecondCandlesDoNotHaveAShortUpperShadow()
                ) ||
                this.thirdCandleSmallerThanSecondAndThirdCandleHasLongUpperShadow())
        ) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 2; i >= 0; i--) {
            this.shadowShortPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                this.slidingWindow.getItem(i)) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                    this.slidingWindow.getItem(i + this.shadowShortAveragePeriod));
        }

        for (let i = 1; i >= 0; i--) {
            this.shadowLongPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                    this.slidingWindow.getItem(i + this.shadowLongAveragePeriod));
        }

        for (let i = 2; i >= 1; i--) {
            this.farPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(i + this.farAveragePeriod));
            this.nearPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(i + this.nearAveragePeriod));
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(2)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(2 + this.bodyLongAveragePeriod));
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowShortAveragePeriod) {
            this.shadowShortPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                this.slidingWindow.getItem(2));
            this.shadowShortPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                this.slidingWindow.getItem(1));
            this.shadowShortPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort, inputData);

        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowLongPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(1));
            this.shadowLongPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(2));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
            this.nearPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.farAveragePeriod) {
            this.farPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(2));
            this.farPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(1));
        }
    }

    private firstThreeCandlesAreWhiteWithConsecutiveHigherCloses() {
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            this.secondCandleColor === candleEnums.CandleColor.White &&
            this.thirdCandleColor === candleEnums.CandleColor.White &&
            this.thirdCandle.close > this.secondCandle.close && this.secondCandle.close > this.firstCandle.close;
    }

    private firstCandleHasALongRealBodyAndShortUpperShadow() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal[2], this.firstCandle);
    }

    private secondCandleOpensWithinOrNearFirstCandlesRealBody() {
        return this.secondCandle.open > this.firstCandle.open &&
            this.secondCandle.open <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[2], this.firstCandle);
    }

    private thirdCandleOpensWithinOrNearSecondCandlesRealBody() {
        return this.thirdCandle.open > this.secondCandle.open &&
            this.thirdCandle.open <= this.secondCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[1], this.secondCandle);
    }

    private secondCandleIsFarSmallerThanFirstAndThridNotLongerThanSecond() {
        return CandleStickUtils.getRealBody(this.secondCandle) < CandleStickUtils.getRealBody(this.firstCandle)
            - CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Far, this.farPeriodTotal[2], this.firstCandle) &&
            CandleStickUtils.getRealBody(this.thirdCandle) < CandleStickUtils.getRealBody(this.secondCandle)
            + CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[1], this.secondCandle);
    }

    private thirdCandleIsFarSmallerThanSecond() {
        return CandleStickUtils.getRealBody(this.thirdCandle) < CandleStickUtils.getRealBody(this.secondCandle) -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Far, this.farPeriodTotal[1], this.secondCandle);
    }

    private thirdCandleIsSmallerThanSecondAndSecondSmallerThanFirst() {
        return CandleStickUtils.getRealBody(this.thirdCandle) < CandleStickUtils.getRealBody(this.secondCandle) &&
            CandleStickUtils.getRealBody(this.secondCandle) < CandleStickUtils.getRealBody(this.thirdCandle);
    }

    private thirdOrSecondCandlesDoNotHaveAShortUpperShadow() {
        return CandleStickUtils.getUpperShadow(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal[0],
                this.thirdCandle) ||
            CandleStickUtils.getUpperShadow(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort,
                this.shadowShortPeriodTotal[1], this.secondCandle);
    }

    private thirdCandleSmallerThanSecondAndThirdCandleHasLongUpperShadow() {
        return CandleStickUtils.getRealBody(this.thirdCandle) < CandleStickUtils.getRealBody(this.secondCandle) &&
            CandleStickUtils.getUpperShadow(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal[0], this.thirdCandle);
    }
}

export class CDLADVANCEBLOCK extends AdvanceBlock {

}
