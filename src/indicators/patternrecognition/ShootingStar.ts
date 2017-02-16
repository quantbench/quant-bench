import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class ShootingStar
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLSHOOTINGSTAR";
    static INDICATOR_DESCR: string = "Shooting Star";

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private shadowLongPeriodTotal: number;

    private shadowLongAveragePeriod: number;

    private shadowVeryShortPeriodTotal: number;

    private shadowVeryShortAveragePeriod: number;

    private firstCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;

    private firstCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(ShootingStar.INDICATOR_NAME, ShootingStar.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;
        this.shadowLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowLong).averagePeriod;
        this.shadowLongPeriodTotal = 0;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;

        const lookback = Math.max(Math.max(this.shadowVeryShortAveragePeriod, this.shadowLongAveragePeriod),
            this.bodyShortAveragePeriod) + 1;
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

        if (this.secondCandleHasASmallRealBody() &&
            this.secondCandleHasALongUpperShadow() &&
            this.secondCandleHasAVeryShortLowerShadow() &&
            this.secondCandleGapsUpFromFirst()) {
            this.setCurrentValue(-100);
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

        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(1);
        this.secondCandle = this.slidingWindow.getItem(0);

        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowLongAveragePeriod) {
            this.shadowLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }
    }

    private secondCandleHasASmallRealBody() {
        return CandleStickUtils.getRealBody(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.secondCandle);
    }

    private secondCandleHasALongUpperShadow() {
        return CandleStickUtils.getUpperShadow(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowLong, this.shadowLongPeriodTotal, this.secondCandle);
    }

    private secondCandleHasAVeryShortLowerShadow() {
        return CandleStickUtils.getLowerShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.secondCandle);
    }

    private secondCandleGapsUpFromFirst() {
        return CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
    }
}

export class CDLSHOOTINGSTAR extends ShootingStar {

}
