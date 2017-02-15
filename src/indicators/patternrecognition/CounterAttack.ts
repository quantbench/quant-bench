import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CounterAttack
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLCOUNTERATTACK";
    static INDICATOR_DESCR: string = "Counterattack";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number[];
    private equalAveragePeriod: number;
    private equalPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CounterAttack.INDICATOR_NAME, CounterAttack.INDICATOR_DESCR);

        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;

        this.bodyLongPeriodTotal = new Array<number>(2);
        for (let i = 0; i < this.bodyLongPeriodTotal.length; i++) {
            this.bodyLongPeriodTotal[i] = 0;
        }

        this.equalPeriodTotal = 0;

        const lookback = Math.max(CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod,
            CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod) + 1;

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

        if (this.twoCandlesAreOfOppositeColor() &&
            this.firstCandleHasLongBody() &&
            this.secondCandleHasLongBody() &&
            this.candlesHaveEqualCloses()) {
            this.setCurrentValue(this.secondCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(this.equalAveragePeriod + 1));

        for (let i = 1; i >= 0; i--) {
            this.bodyLongPeriodTotal[i] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(i + this.bodyLongAveragePeriod));
        }
        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(1);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);

        this.secondCandle = this.slidingWindow.getItem(0);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.equalAveragePeriod) {
            this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1));
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(1));
            this.bodyLongPeriodTotal[0] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }
    }

    private twoCandlesAreOfOppositeColor() {
        return this.firstCandleColor === -this.secondCandleColor;
    }

    private firstCandleHasLongBody() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal[1], this.firstCandle);
    }

    private secondCandleHasLongBody() {
        return CandleStickUtils.getRealBody(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal[0], this.secondCandle);
    }

    private candlesHaveEqualCloses() {
        return this.secondCandle.close <= this.firstCandle.close + CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal,
            this.equalPeriodTotal, this.firstCandle) &&
            this.secondCandle.close >= this.firstCandle.close - CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal,
                this.equalPeriodTotal, this.firstCandle);
    }
}

export class CDLCOUNTERATTACK extends CounterAttack {

}
