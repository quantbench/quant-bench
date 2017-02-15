import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLUNIQUE3RIVER
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLUNIQUE3RIVER";
    static INDICATOR_DESCR: string = "Unique 3 River";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLUNIQUE3RIVER.INDICATOR_NAME, CDLUNIQUE3RIVER.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        const lookback = Math.max(this.bodyLongAveragePeriod, this.bodyShortAveragePeriod) + 2;
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
            this.secondCandleIsBlackHaramiWithLowerLow() &&
            this.thirdCandleIsShortWhiteWithopenNotLowerThanSecondLow()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 2));

        this.bodyShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.thirdCandle) -
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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 2
            && this.slidingWindow.samples < this.slidingWindow.period - 2) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }
    }

    private firstCandleIsLongBlackCandle() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsBlackHaramiWithLowerLow() {
        return this.secondCandleColor === candleEnums.CandleColor.Black &&
            this.secondCandle.close > this.firstCandle.close && this.secondCandle.open <= this.firstCandle.open &&
            this.secondCandle.low < this.firstCandle.low;
    }

    private thirdCandleIsShortWhiteWithopenNotLowerThanSecondLow() {
        return this.thirdCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getRealBody(this.thirdCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle) &&
            this.thirdCandle.open > this.secondCandle.low;
    }
}
