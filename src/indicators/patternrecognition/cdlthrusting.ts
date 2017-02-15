import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLTHRUSTING
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLTHRUSTING";
    static INDICATOR_DESCR: string = "Thrusting Pattern";

    private equalAveragePeriod: number;
    private equalPeriodTotal: number;
    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLTHRUSTING.INDICATOR_NAME, CDLTHRUSTING.INDICATOR_DESCR);

        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.equalPeriodTotal = 0;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;

        const lookback = Math.max(this.equalAveragePeriod, this.bodyLongAveragePeriod) + 1;
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

        if (this.firstCandleIsLongBlackCandle() &&
            this.secondCandleIsWhiteWhichOpensBelowPriorLowAndClosesUnderPriorRealBodysMidpoint()) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        this.equalPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(this.equalAveragePeriod + 1));

        this.bodyLongPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(1)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(1);
        this.secondCandle = this.slidingWindow.getItem(0);

        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.equalAveragePeriod) {
            this.equalPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(1));
        }
    }

    private firstCandleIsLongBlackCandle() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsWhiteWhichOpensBelowPriorLowAndClosesUnderPriorRealBodysMidpoint() {
        return this.secondCandleColor === candleEnums.CandleColor.White &&
            this.secondCandle.open < this.firstCandle.low &&
            this.secondCandle.close > this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle) &&
            this.secondCandle.close <= this.firstCandle.close +
            CandleStickUtils.getRealBody(this.firstCandle) * 0.5;
    }
}
