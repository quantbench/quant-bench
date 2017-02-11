import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLHAMMER
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHAMMER";
    static INDICATOR_DESCR: string = "Hammer";

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private shadowLongPeriodTotal: number;

    private shadowLongAveragePeriod: number;

    private shadowVeryShortPeriodTotal: number;

    private shadowVeryShortAveragePeriod: number;

    private nearPeriodTotal: number;

    private nearAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLHAMMER.INDICATOR_NAME, CDLHAMMER.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyShortPeriodTotal = 0;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.shadowLongPeriodTotal = 0;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;
        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.nearPeriodTotal = 0;

        const lookback = Math.max(
            Math.max(Math.max(this.bodyShortAveragePeriod, this.shadowLongAveragePeriod),
                this.shadowVeryShortAveragePeriod), this.nearAveragePeriod) + 1;
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

        if (this.secondCandleHasSmallRealBodyALongLowerShadowAndShortUpperShadow() &&
            this.secondCandlesRealBodyNearTheFirstCandlesLows()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

        this.shadowLongPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong,
                this.slidingWindow.getItem(this.shadowLongAveragePeriod));

        this.shadowVeryShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod));

        this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(this.nearAveragePeriod + 1));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(1);
        this.secondCandle = this.slidingWindow.getItem(0);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }
    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod - 1 &&
            this.slidingWindow.samples < this.slidingWindow.period - 1) {
            this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, inputData);
        }
    }

    private secondCandleHasSmallRealBodyALongLowerShadowAndShortUpperShadow() {
        return CandleStickUtils.getRealBody(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.secondCandle) &&
            CandleStickUtils.getLowerShadow(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.secondCandle) &&
            CandleStickUtils.getUpperShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal,
                this.secondCandle);
    }

    private secondCandlesRealBodyNearTheFirstCandlesLows() {
        return Math.min(this.secondCandle.close, this.secondCandle.open) <=
            this.firstCandle.low + CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal,
                this.firstCandle);
    }
}
