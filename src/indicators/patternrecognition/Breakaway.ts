import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Breakaway
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLBREAKAWAY";
    static INDICATOR_DESCR: string = "Breakaway";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
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
    constructor() {
        super(Breakaway.INDICATOR_NAME, Breakaway.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;

        this.bodyLongPeriodTotal = 0;

        const lookback = this.bodyLongAveragePeriod + 4;
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
            this.firstSecondAndFourthCandlesAreTheSameColorAndFifthIsOpposite() &&
            (
                this.isBullishBreakAway() ||
                this.isBearishBreakAway())
        ) {
            this.setCurrentValue(this.fifthCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(4 + this.bodyLongAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(4);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);

        this.secondCandle = this.slidingWindow.getItem(3);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);

        this.thirdCandle = this.slidingWindow.getItem(2);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);

        this.fourthCandle = this.slidingWindow.getItem(1);
        this.fourthCandleColor = CandleStickUtils.getCandleColor(this.fourthCandle);

        this.fifthCandle = this.slidingWindow.getItem(0);
        this.fifthCandleColor = CandleStickUtils.getCandleColor(this.fifthCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(4));
        }
    }

    private firstCandleIsALongCandle() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private firstSecondAndFourthCandlesAreTheSameColorAndFifthIsOpposite() {
        return CandleStickUtils.getCandleColor(this.firstCandle) === CandleStickUtils.getCandleColor(this.secondCandle) &&
            CandleStickUtils.getCandleColor(this.secondCandle) === CandleStickUtils.getCandleColor(this.fourthCandle) &&
            CandleStickUtils.getCandleColor(this.fourthCandle) === -CandleStickUtils.getCandleColor(this.fifthCandle);
    }

    private isBullishBreakAway() {
        return CandleStickUtils.getCandleColor(this.firstCandle) === candleEnums.CandleColor.Black &&
            // 2nd gaps down
            CandleStickUtils.getRealBodyGapDown(this.secondCandle, this.firstCandle) &&
            // 3rd has lower high and low than 2nd
            this.thirdCandle.high < this.secondCandle.high && this.thirdCandle.low < this.secondCandle.low &&
            // 4th has lower high and low than 3rd
            this.fourthCandle.high < this.thirdCandle.high && this.fourthCandle.low < this.thirdCandle.low &&
            // 5th closes inside the gap
            this.fifthCandle.close > this.secondCandle.open && this.fifthCandle.close < this.firstCandle.close;
    }

    private isBearishBreakAway() {
        return CandleStickUtils.getCandleColor(this.firstCandle) === candleEnums.CandleColor.White &&
            // 2nd gaps up
            CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle) &&
            // 3rd has higher high and low than 2nd
            this.thirdCandle.high > this.secondCandle.high && this.thirdCandle.low > this.secondCandle.low &&
            // 4th has higher high and low than 3rd
            this.fourthCandle.high > this.thirdCandle.high && this.fourthCandle.low > this.thirdCandle.low &&
            // 5th closes inside the gap
            this.fifthCandle.close < this.secondCandle.open && this.fifthCandle.close > this.firstCandle.close;
    }
}

export class CDLBREAKAWAY extends Breakaway {

}
