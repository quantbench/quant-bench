import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class ThreeLineStrike
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL3LINESTRIKE";
    static INDICATOR_DESCR: string = "Three-Line Strike ";

    private nearPeriodTotal: number[];
    private nearAveragePeriod: number;
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
        super(ThreeLineStrike.INDICATOR_NAME, ThreeLineStrike.INDICATOR_DESCR);

        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;

        this.nearPeriodTotal = new Array<number>(4);
        for (let i = 0; i < this.nearPeriodTotal.length; i++) {
            this.nearPeriodTotal[i] = 0;
        }

        const lookback = this.nearAveragePeriod + 3;
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

        if (this.firstThreeCandlesAreOfTheSameColor() && this.fourthCandleIsOfOppositeColor() &&
            this.secondOpensNearFirstCandlesRealBody() && this.thirdOpensNearSecondCandlesRealBody() &&
            this.fourthCandleEngulfsPreviousThree()) {
            this.setCurrentValue(this.secondCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 3; i >= 2; i--) {
            this.nearPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                    this.slidingWindow.getItem(i + this.nearAveragePeriod));
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal[3] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(3));
            this.nearPeriodTotal[2] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
        }
    }

    private firstThreeCandlesAreOfTheSameColor(): boolean {
        return this.firstCandleColor === this.secondCandleColor && this.secondCandleColor === this.thirdCandleColor ? true : false;
    }

    private fourthCandleIsOfOppositeColor(): boolean {
        return this.thirdCandleColor !== this.fourthCandleColor;
    }

    private secondOpensNearFirstCandlesRealBody(): boolean {
        return this.secondCandle.open >= Math.min(this.firstCandle.open, this.firstCandle.close)
            - CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[3], this.firstCandle) &&
            this.secondCandle.open <= Math.min(this.firstCandle.open, this.firstCandle.close)
            + CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[3], this.firstCandle);
    }

    private thirdOpensNearSecondCandlesRealBody(): boolean {
        return this.thirdCandle.open >= Math.min(this.secondCandle.open, this.secondCandle.close)
            - CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[3], this.secondCandle) &&
            this.thirdCandle.open <= Math.min(this.secondCandle.open, this.secondCandle.close)
            + CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal[3], this.secondCandle);
    }

    private fourthCandleEngulfsPreviousThree(): boolean {
        if ( // three white candles
            (this.thirdCandleColor === candleEnums.CandleColor.White &&
                // with consecutive higher closes
                this.thirdCandle.close > this.secondCandle.close && this.secondCandle.close > this.firstCandle.close &&
                // fourth candle opens above prior close
                this.fourthCandle.open > this.thirdCandle.close &&
                // fourth closes below first candles open
                this.fourthCandle.close < this.firstCandle.open

            ) || ( // three black candles
                // with consecutive lower closes
                this.thirdCandle.close < this.secondCandle.close && this.secondCandle.close < this.firstCandle.close &&
                // fourth candle opens below prior close
                this.fourthCandle.open < this.thirdCandle.close &&
                // fourth closes above first candles open
                this.fourthCandle.close > this.firstCandle.open
            )
        ) {
            return true;
        }

        return false;
    }
}

export class CDL3LINESTRIKE extends ThreeLineStrike {

}
