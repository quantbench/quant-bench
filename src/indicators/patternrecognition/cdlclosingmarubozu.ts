import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../slidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLCLOSINGMARUBOZU
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLCLOSINGMARUBOZU";
    static INDICATOR_DESCR: string = "Closing Marubozu";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private shadowVeryShortAveragePeriod: number;
    private shadowVeryShortPeriodTotal: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private currentCandle: marketData.IPriceBar;
    private candleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLCLOSINGMARUBOZU.INDICATOR_NAME, CDLCLOSINGMARUBOZU.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;

        this.bodyLongPeriodTotal = 0;
        this.shadowVeryShortPeriodTotal = 0;
        this.currentCandle = undefined;
        this.candleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyLongAveragePeriod, this.shadowVeryShortAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.currentCandle = inputData;
        this.candleColor = CandleStickUtils.getCandleColor(this.currentCandle);
        if (this.hasLongRealBody() && this.hasVeryShortShadow()) {
            this.setCurrentValue(this.candleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.currentCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

        this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
            this.currentCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod));

        return this.isReady;
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }
    }

    private hasLongRealBody(): boolean {
        return CandleStickUtils.getRealBody(this.currentCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                this.bodyLongPeriodTotal, this.currentCandle);
    }

    private hasVeryShortShadow(): boolean {
        return (
            this.candleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getUpperShadow(this.currentCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.currentCandle)
        )
            || (
                this.candleColor === candleEnums.CandleColor.Black &&
                CandleStickUtils.getLowerShadow(this.currentCandle) <
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.shadowVeryShortPeriodTotal, this.currentCandle)
            );
    }
}
