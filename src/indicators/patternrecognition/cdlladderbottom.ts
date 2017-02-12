import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLLADDERBOTTOM
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLLADDERBOTTOM";
    static INDICATOR_DESCR: string = "Ladder Bottom";

    private shadowVeryShortPeriodTotal: number;

    private shadowVeryShortAveragePeriod: number;
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
        super(CDLLADDERBOTTOM.INDICATOR_NAME, CDLLADDERBOTTOM.INDICATOR_DESCR);

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;

        const lookback = this.shadowVeryShortAveragePeriod + 4;
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

        if (this.firstThreeCandlesAreBlackWithConsecutiveLowerOpensAndCloses() &&
            this.fourthCandleIsBlackWithAnUpperShadow() &&
            this.fifthCandleIsWhiteAndOpensAbovePriorCandleBodyAndClosesAbovePriorCandleHigh()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.shadowVeryShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.fourthCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod + 1));
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(1));
        }
    }

    private firstThreeCandlesAreBlackWithConsecutiveLowerOpensAndCloses() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            this.secondCandleColor === candleEnums.CandleColor.Black &&
            this.thirdCandleColor === candleEnums.CandleColor.Black &&
            this.firstCandle.open > this.secondCandle.open && this.secondCandle.open > this.thirdCandle.open &&
            // and closes
            this.firstCandle.close > this.secondCandle.close && this.secondCandle.close > this.thirdCandle.close;
    }

    private fourthCandleIsBlackWithAnUpperShadow() {
        return this.fourthCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getUpperShadow(this.fourthCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.fourthCandle);
    }

    private fifthCandleIsWhiteAndOpensAbovePriorCandleBodyAndClosesAbovePriorCandleHigh() {
        return this.fifthCandleColor === candleEnums.CandleColor.White &&
            // that opens above prior candle's body
            this.fifthCandle.open > this.fourthCandle.open &&
            // and closes above prior candle's high
            this.fifthCandle.close > this.fourthCandle.high;
    }
}
