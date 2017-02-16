import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class InNeck
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLINNECK";
    static INDICATOR_DESCR: string = "In-Neck Pattern";

    private equalPeriodTotal: number;

    private equalAveragePeriod: number;

    private bodyLongPeriodTotal: number;

    private bodyLongAveragePeriod: number;

    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(InNeck.INDICATOR_NAME, InNeck.INDICATOR_DESCR);

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
            this.secondIsWhiteCandleOpeningBelowPriorLowAndClosingJustInPriorBody()) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
            this.slidingWindow.getItem(1)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(this.equalAveragePeriod + 1));

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.slidingWindow.getItem(1)) -
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
            this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(1));
        }
    }

    private firstCandleIsLongBlackCandle() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondIsWhiteCandleOpeningBelowPriorLowAndClosingJustInPriorBody() {
        return this.secondCandleColor === candleEnums.CandleColor.White &&
            this.secondCandle.open < this.firstCandle.low &&
            this.secondCandle.close <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle) &&
            this.secondCandle.close >= this.firstCandle.close;
    }
}

export class CDLINNECK extends InNeck {

}
