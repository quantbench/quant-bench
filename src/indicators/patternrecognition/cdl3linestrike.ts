import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL3LINESTRIKE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3LINESTRIKE";
    static INDICATOR_DESCR: string = "Three-Line Strike ";

    private nearPeriodTotal: number[];
    private nearAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    private fourthCandle: marketData.IPriceBar;
    private thirdCandle: marketData.IPriceBar;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private fourthCandleColor: candleEnums.CandleColor;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;
    constructor() {
        super(CDL3LINESTRIKE.INDICATOR_NAME, CDL3LINESTRIKE.INDICATOR_DESCR);

        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;

        this.nearPeriodTotal = new Array<number>(4);
        this.fourthCandle = undefined;
        this.thirdCandle = undefined;
        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.fourthCandleColor = candleEnums.CandleColor.Black;
        this.thirdCandleColor = candleEnums.CandleColor.Black;
        this.secondCandleColor = candleEnums.CandleColor.Black;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = this.nearAveragePeriod + 3;
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
    private seedSlidingWindow(inputData: marketData.IPriceBar) {
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
