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
    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLCLOSINGMARUBOZU.INDICATOR_NAME, CDLCLOSINGMARUBOZU.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;

        this.bodyLongPeriodTotal = 0;
        this.shadowVeryShortPeriodTotal = 0;

        const lookback = Math.max(this.bodyLongAveragePeriod, this.shadowVeryShortAveragePeriod);
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

        this.firstCandle = inputData;
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
        if (this.hasLongRealBody() && this.hasVeryShortShadow()) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.firstCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

        this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
            this.firstCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
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
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                this.bodyLongPeriodTotal, this.firstCandle);
    }

    private hasVeryShortShadow(): boolean {
        return (
            this.firstCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                this.shadowVeryShortPeriodTotal, this.firstCandle)
        )
            || (
                this.firstCandleColor === candleEnums.CandleColor.Black &&
                CandleStickUtils.getLowerShadow(this.firstCandle) <
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.shadowVeryShortPeriodTotal, this.firstCandle)
            );
    }
}
