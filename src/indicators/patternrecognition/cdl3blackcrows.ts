import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL3BLACKCROWS
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL3BLACKCROWS";
    static INDICATOR_DESCR: string = "Three Black Crows";

    private shadowVeryShortPeriodTotal: number[];
    private shadowVeryShortAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private fourthCandle: marketData.PriceBar;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private fourthCandleColor: candleEnums.CandleColor;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDL3BLACKCROWS.INDICATOR_NAME, CDL3BLACKCROWS.INDICATOR_DESCR);

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;

        this.shadowVeryShortPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.shadowVeryShortPeriodTotal.length; i++) {
            this.shadowVeryShortPeriodTotal[i] = 0;
        }

        const lookback = this.shadowVeryShortAveragePeriod + 3;
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

        if (this.hasWhitefirstCandle() &&
            this.hasSecondBlackCandleWithVeryShortShadow() &&
            this.hasThirdBlackCandleWithVeryShortShadow() &&
            this.hasFourthBlackCandleWithVeryShortShadow() &&
            this.firstBlackCandleClosesUnderPriorWhiteCandlesHigh() &&
            this.secondBlackCandleOpensWithInFirstBlackCandlesRealBody() &&
            this.thirdBlackCandleOpensWithInSecondBlackCandlesRealBody() &&
            this.threeBlackCandlesAreDeclining()
        ) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 2; i >= 0; i--) {
            this.shadowVeryShortPeriodTotal[i]
                += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(i + this.shadowVeryShortAveragePeriod));
        }
        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(3);
        this.secondCandle = this.slidingWindow.getItem(2);
        this.thirdCandle = this.slidingWindow.getItem(1);
        this.fourthCandle = this.slidingWindow.getItem(0);
        this.fourthCandleColor = CandleStickUtils.getCandleColor(this.fourthCandle);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }
    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal[2] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(2));
            this.shadowVeryShortPeriodTotal[1] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(1));
            this.shadowVeryShortPeriodTotal[0] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }
    }

    private hasWhitefirstCandle() {
        return this.firstCandleColor === candleEnums.CandleColor.White;
    }

    private hasSecondBlackCandleWithVeryShortShadow() {
        return this.secondCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[2], this.secondCandle);
    }

    private hasThirdBlackCandleWithVeryShortShadow() {
        return this.thirdCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[1], this.thirdCandle);
    }

    private hasFourthBlackCandleWithVeryShortShadow() {
        return this.fourthCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[0], this.fourthCandle);
    }

    private firstBlackCandleClosesUnderPriorWhiteCandlesHigh() {
        return this.firstCandle.high > this.secondCandle.close;
    }
    private secondBlackCandleOpensWithInFirstBlackCandlesRealBody() {
        return this.thirdCandle.open < this.secondCandle.open && this.thirdCandle.open > this.secondCandle.close;
    }
    private thirdBlackCandleOpensWithInSecondBlackCandlesRealBody() {
        return this.fourthCandle.open < this.thirdCandle.open && this.fourthCandle.open > this.thirdCandle.close;
    }
    private threeBlackCandlesAreDeclining() {
        return this.secondCandle.close > this.thirdCandle.close && this.thirdCandle.close > this.fourthCandle.close;
    }
}
