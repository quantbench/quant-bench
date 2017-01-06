import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../slidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL3INSIDE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3INSIDE";
    static INDICATOR_DESCR: string = "Three Inside Up/Down";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private thirdCandle: marketData.IPriceBar;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private currentCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDL3INSIDE.INDICATOR_NAME, CDL3INSIDE.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;

        this.bodyLongPeriodTotal = 0;
        this.bodyShortPeriodTotal = 0;
        this.thirdCandle = undefined;
        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.currentCandleColor = candleEnums.CandleColor.Black;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyLongAveragePeriod, this.bodyShortAveragePeriod) + 2;
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            if (this.isFirstCandle()) {
                this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
            }
            if (this.isSecondCandle()) {
                this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
            }
            return this.isReady;
        }

        this.firstCandle = this.slidingWindow.getItem(2);
        this.secondCandle = this.slidingWindow.getItem(1);
        this.thirdCandle = inputData;
        this.currentCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);

        if (this.hasFirstCandleWithLongRealBody() &&
            this.hasSecondCandleWithShortRealBody() &&
            this.secondCandleIsEngulfedByFirst() &&
            this.thirdCandleContinuesPatternOfFirstStrongly()) {
            this.setCurrentValue(this.firstCandleColor * -100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.firstCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(2 + this.bodyLongAveragePeriod));

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
            this.secondCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(1 + this.bodyShortAveragePeriod));
        return this.isReady;
    }

    private isFirstCandle(): boolean {
        return this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 2
            && this.slidingWindow.samples < this.slidingWindow.period - 2;
    }

    private isSecondCandle(): boolean {
        return this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod - 1
            && this.slidingWindow.samples < this.slidingWindow.period - 1;
    }

    private hasFirstCandleWithLongRealBody(): boolean {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                this.bodyLongPeriodTotal, this.firstCandle);
    }

    private hasSecondCandleWithShortRealBody(): boolean {
        return CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort,
                this.bodyShortPeriodTotal, this.secondCandle);
    }

    private secondCandleIsEngulfedByFirst(): boolean {
        return Math.max(this.secondCandle.close, this.secondCandle.open)
            < Math.max(this.firstCandle.close, this.firstCandle.open) &&
            Math.min(this.secondCandle.close, this.secondCandle.open)
            > Math.min(this.firstCandle.close, this.firstCandle.open);
    }

    private thirdCandleContinuesPatternOfFirstStrongly(): boolean {
        return (this.firstCandleColor === candleEnums.CandleColor.White &&
            this.currentCandleColor === candleEnums.CandleColor.Black &&
            this.thirdCandle.close < this.firstCandle.open
        ) ||
            (this.firstCandleColor === candleEnums.CandleColor.Black &&
                this.currentCandleColor === candleEnums.CandleColor.White &&
                this.thirdCandle.close > this.firstCandle.open);
    }
}
