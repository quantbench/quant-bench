import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../slidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLUPSIDEGAP2CROWS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLUPSIDEGAP2CROWS";
    static INDICATOR_DESCR: string = "Upside Gap Two Crows";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private thirdCandle: marketData.IPriceBar;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLUPSIDEGAP2CROWS.INDICATOR_NAME, CDLUPSIDEGAP2CROWS.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        const lookback = Math.max(this.bodyLongAveragePeriod, this.bodyShortAveragePeriod) + 2;
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

        if (this.firstCandleIsLognWhiteCandle() &&
            this.secondCandleIsShortyWhiteCandleThatGapsUp() &&
            this.thirdCandleIsBlackEngulfingPriorRealBodyAndClosingAboveFirst()) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

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

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.bodyLongAveragePeriod - 2 &&
            this.slidingWindow.samples < this.slidingWindow.period - 2) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.bodyShortAveragePeriod - 1 &&
            this.slidingWindow.samples < this.slidingWindow.period - 1) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }
    }

    private firstCandleIsLognWhiteCandle() {
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsShortyWhiteCandleThatGapsUp() {
        return this.secondCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.secondCandle) &&
            CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
    }

    private thirdCandleIsBlackEngulfingPriorRealBodyAndClosingAboveFirst() {
        return this.thirdCandleColor === candleEnums.CandleColor.Black &&
            this.thirdCandle.open > this.secondCandle.open && this.thirdCandle.close < this.secondCandle.close &&
            this.thirdCandle.close > this.firstCandle.close;
    }
}
