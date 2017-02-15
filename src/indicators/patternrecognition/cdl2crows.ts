import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL2CROWS
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL2CROWS";
    static INDICATOR_DESCR: string = "Two Crows";

    private bodyLongPeriodTotal: number;
    private bodyLongAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDL2CROWS.INDICATOR_NAME, CDL2CROWS.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;

        this.bodyLongPeriodTotal = 0;

        const lookback = this.bodyLongAveragePeriod + 2;
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

        if (this.hasFirstWhiteCandleWithLongRealBody() &&
            this.hasSecondBlackCandleThatGapsUp() &&
            this.hasThirdBlackCandleOpeningWithSecondAndClosingWithinFirstRealBody()
        ) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.thirdCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 2
            && this.slidingWindow.samples < this.slidingWindow.period - 2) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }
    }

    private hasFirstWhiteCandleWithLongRealBody() {
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                this.bodyLongPeriodTotal, this.firstCandle);
    }

    private hasSecondBlackCandleThatGapsUp() {
        return this.secondCandleColor === candleEnums.CandleColor.Black &&
            this.hasGapUp(this.firstCandle, this.secondCandle);
    }

    private hasThirdBlackCandleOpeningWithSecondAndClosingWithinFirstRealBody() {
        return this.thirdCandle.open < this.secondCandle.open &&
            this.thirdCandle.open > this.secondCandle.close &&
            this.thirdCandle.close > this.firstCandle.open &&
            this.thirdCandle.close < this.firstCandle.close;
    }

    private hasGapUp(firstCandle: marketData.PriceBar, secondCandle: marketData.PriceBar): boolean {
        return CandleStickUtils.getRealBodyGapUp(secondCandle, firstCandle);
    }
}
