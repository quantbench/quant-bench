import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";
export class ThreeStarsInTheSouth
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL3STARSINSOUTH";
    static INDICATOR_DESCR: string = "Three Stars In The South";

    private shadowVeryShortPeriodTotal: number[];
    private shadowVeryShortAveragePeriod: number;

    private shadowLongPeriodTotal: number;
    private shadowLongAveragePeriod: number;

    private bodyLongPeriodTotal: number;

    private bodyLongAveragePeriod: number;

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
        super(ThreeStarsInTheSouth.INDICATOR_NAME, ThreeStarsInTheSouth.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.shadowLongPeriodTotal = 0;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = new Array<number>(2);
        for (let i = 0; i < this.shadowVeryShortPeriodTotal.length; i++) {
            this.shadowVeryShortPeriodTotal[i] = 0;
        }
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        const lookback = Math.max(
            Math.max(this.shadowVeryShortAveragePeriod, this.shadowLongAveragePeriod),
            Math.max(this.bodyLongAveragePeriod, this.bodyShortAveragePeriod)) + 2;
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

        if (this.allThreeCandlesAreBlack() &&
            this.firstCandleHasLongRealBodyWithLonglowerShadow() &&
            this.secondCandleIsSimialrButWithinFirstAndWithAhigherlow() &&
            this.thirdCandleIsASmallMarubozu()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(2 + this.bodyLongAveragePeriod));

        this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(2 + this.shadowLongAveragePeriod));

        for (let i = 1; i >= 0; i--) {
            this.shadowVeryShortPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(i + this.shadowVeryShortAveragePeriod));
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(2));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(2));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowVeryShortPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(1));
            this.shadowVeryShortPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                inputData);
        }
    }

    private allThreeCandlesAreBlack() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            this.secondCandleColor === candleEnums.CandleColor.Black &&
            this.thirdCandleColor === candleEnums.CandleColor.Black;
    }

    private firstCandleHasLongRealBodyWithLonglowerShadow() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            // long real body
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle) &&
            // with long lower shadow
            CandleStickUtils.getLowerShadow(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsSimialrButWithinFirstAndWithAhigherlow() {
        // 2nd: smaller candle
        return CandleStickUtils.getRealBody(this.secondCandle) < CandleStickUtils.getRealBody(this.firstCandle) &&
            //      that opens higher but within 1st range
            this.secondCandle.open > this.firstCandle.close && this.secondCandle.open <= this.firstCandle.high &&
            //      and trades lower than 1st close
            this.secondCandle.low < this.firstCandle.close &&
            //      but not lower than 1st low
            this.secondCandle.low >= this.firstCandle.low &&
            //      and has a lower shadow
            CandleStickUtils.getLowerShadow(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[1], this.secondCandle);
    }

    private thirdCandleIsASmallMarubozu() {
        // 3rd: small marubozu
        return CandleStickUtils.getRealBody(this.thirdCandle)
            < CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle) &&
            CandleStickUtils.getLowerShadow(this.thirdCandle)
            < CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[0], this.thirdCandle) &&
            CandleStickUtils.getUpperShadow(this.thirdCandle)
            < CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[0], this.thirdCandle) &&
            // engulfed by prior candle's range
            this.thirdCandle.low > this.secondCandle.low && this.thirdCandle.high < this.secondCandle.high;
    }
}

export class CDL3STARSINSOUTH extends ThreeStarsInTheSouth {

}
