import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLIDENTICAL3CROWS
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLIDENTICAL3CROWS";
    static INDICATOR_DESCR: string = "Identical Three Crows";

    private shadowVeryShortPeriodTotal: number[];
    private shadowVeryShortAveragePeriod: number;

    private equalPeriodTotal: number[];
    private equalAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLIDENTICAL3CROWS.INDICATOR_NAME, CDLIDENTICAL3CROWS.INDICATOR_DESCR);

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = new Array<number>(3);
        this.shadowVeryShortPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.shadowVeryShortPeriodTotal.length; i++) {
            this.shadowVeryShortPeriodTotal[i] = 0;
        }

        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.equalPeriodTotal = new Array<number>(3);
        this.equalPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.equalPeriodTotal.length; i++) {
            this.equalPeriodTotal[i] = 0;
        }

        const lookback = Math.max(this.shadowVeryShortAveragePeriod, this.equalAveragePeriod) + 2;
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

        if (this.firstCandleIsBlackWithVeryShortLowerShadow() &&
            this.secondCandleIsBlackWithVeryShortLowerShadow() &&
            this.thirdCandleIsBlackWithVeryShortLowerShadow() &&
            this.allCandlesAreDeclining() &&
            this.secondBlackOpensVeryCloseToFirstClose() &&
            this.thirdBlackOpensVeryCloseToSecondClose()) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 2; i >= 0; i--) {
            this.shadowVeryShortPeriodTotal[i] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(i + this.shadowVeryShortAveragePeriod));
        }

        for (let i = 2; i >= 1; i--) {
            this.equalPeriodTotal[i] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                    this.slidingWindow.getItem(i + this.equalAveragePeriod));
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
    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(2));
            this.shadowVeryShortPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(1));
            this.shadowVeryShortPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.equalAveragePeriod) {
            this.equalPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
            this.equalPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(1));
        }
    }

    private firstCandleIsBlackWithVeryShortLowerShadow() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getLowerShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[2],
                this.firstCandle);
    }

    private secondCandleIsBlackWithVeryShortLowerShadow() {
        return this.secondCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getLowerShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[1],
                this.secondCandle);
    }

    private thirdCandleIsBlackWithVeryShortLowerShadow() {
        return this.thirdCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getLowerShadow(this.thirdCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal[0],
                this.thirdCandle);
    }

    private allCandlesAreDeclining() {
        return this.firstCandle.close > this.secondCandle.close &&
            this.secondCandle.close > this.thirdCandle.close;
    }

    private secondBlackOpensVeryCloseToFirstClose() {
        return this.secondCandle.open <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal[2], this.firstCandle) &&
            this.secondCandle.open >= this.firstCandle.close -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal[2], this.firstCandle);
    }

    private thirdBlackOpensVeryCloseToSecondClose() {
        return this.thirdCandle.open <= this.secondCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal[1], this.secondCandle) &&
            this.thirdCandle.open >= this.secondCandle.close -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal[1], this.secondCandle);
    }
}
