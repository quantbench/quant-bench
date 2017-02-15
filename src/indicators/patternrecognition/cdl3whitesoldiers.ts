import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL3WHITESOLDIERS
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL3WHITESOLDIERS";
    static INDICATOR_DESCR: string = "Three Advancing White Soldiers";

    private shadowVeryShortPeriodTotal: number[];
    private shadowVeryShortAveragePeriod: number;

    private nearPeriodTotal: number[];
    private nearAveragePeriod: number;

    private farPeriodTotal: number[];

    private farAveragePeriod: number;

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;
    constructor() {
        super(CDL3WHITESOLDIERS.INDICATOR_NAME, CDL3WHITESOLDIERS.INDICATOR_DESCR);
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.farAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Far).averagePeriod;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;

        this.shadowVeryShortPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.shadowVeryShortPeriodTotal.length; i++) {
            this.shadowVeryShortPeriodTotal[i] = 0;
        }
        this.nearPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.nearPeriodTotal.length; i++) {
            this.nearPeriodTotal[i] = 0;
        }
        this.farPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.farPeriodTotal.length; i++) {
            this.farPeriodTotal[i] = 0;
        }
        this.bodyShortPeriodTotal = 0;

        const lookback = Math.max(
            Math.max(this.shadowVeryShortAveragePeriod, this.bodyShortAveragePeriod),
            Math.max(this.nearAveragePeriod, this.farAveragePeriod)) + 2;
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

        if (this.allThreeCandlesAreWhiteWithShortUpperShadowsAndHigerCloses() &&
            this.secondCandleOpensWithinFirstRealBody() &&
            this.thirdCandleOpensWithingSecondRealBody() &&
            this.secondCandleIsNotMuchShorterThanFirst() &&
            this.thirdCandleIsNotMuchShorterThanSecond() &&
            this.thirdCandleDoesNotHaveAShortRealBody()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 2; i >= 0; i--) {
            this.shadowVeryShortPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(i)) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(i + this.shadowVeryShortAveragePeriod));
        }

        for (let i = 2; i >= 1; i--) {
            this.farPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(i + this.farAveragePeriod));
        }

        for (let i = 2; i >= 1; i--) {
            this.nearPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(i + this.nearAveragePeriod));
        }

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(2));
            this.shadowVeryShortPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(1));
            this.shadowVeryShortPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
            this.nearPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.farAveragePeriod) {
            this.farPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(2));
            this.farPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Far, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }
    }

    private allThreeCandlesAreWhiteWithShortUpperShadowsAndHigerCloses() {
        // first candle white with short upper shadow
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[2],
                this.firstCandle) &&
            // second candle white with short upper shadow
            this.secondCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getUpperShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[1],
                this.secondCandle) &&
            // third candle white with short upper shadow
            this.thirdCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getUpperShadow(this.thirdCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[0],
                this.thirdCandle) &&
            // consecutive higher highs
            this.thirdCandle.close > this.secondCandle.close && this.secondCandle.close > this.firstCandle.close;
    }

    private secondCandleOpensWithinFirstRealBody() {
        return this.secondCandle.open > this.firstCandle.open &&
            this.secondCandle.open <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[2], this.firstCandle);
    }

    private thirdCandleOpensWithingSecondRealBody() {
        return this.thirdCandle.open > this.secondCandle.open &&
            this.thirdCandle.open <= this.secondCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[1], this.secondCandle);
    }

    private secondCandleIsNotMuchShorterThanFirst() {
        return CandleStickUtils.getRealBody(this.secondCandle) >
            CandleStickUtils.getRealBody(this.firstCandle) -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Far, this.farPeriodTotal[2], this.firstCandle);
    }

    private thirdCandleIsNotMuchShorterThanSecond() {
        return CandleStickUtils.getRealBody(this.thirdCandle) >
            CandleStickUtils.getRealBody(this.secondCandle) -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Far, this.farPeriodTotal[1], this.secondCandle);
    }

    private thirdCandleDoesNotHaveAShortRealBody() {
        return CandleStickUtils.getRealBody(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle);
    }
}
