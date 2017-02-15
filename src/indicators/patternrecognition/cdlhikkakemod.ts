import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLHIKKAKEMOD
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLHIKKAKEMOD";
    static INDICATOR_DESCR: string = "Modified Hikkake Pattern";

    private nearPeriodTotal: number;

    private nearAveragePeriod: number;

    private patternIndex: number;

    private patternResult: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(CDLHIKKAKEMOD.INDICATOR_NAME, CDLHIKKAKEMOD.INDICATOR_DESCR);

        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.nearPeriodTotal = 0;
        const lookback = Math.max(1, this.nearAveragePeriod) + 5;
        this.slidingWindow = new SlidingWindow<marketData.PriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        // 2nd: lower high and higher low than 1st
        if (this.slidingWindow.getItem(2).high < this.slidingWindow.getItem(3).high &&
            this.slidingWindow.getItem(2).low > this.slidingWindow.getItem(3).low &&
            // 3rd: lower high and higher low than 2nd
            this.slidingWindow.getItem(1).high < this.slidingWindow.getItem(2).high &&
            this.slidingWindow.getItem(1).low > this.slidingWindow.getItem(2).low &&
            // (bull) 4th: lower high and lower low
            ((inputData.high < this.slidingWindow.getItem(1).high && inputData.low < this.slidingWindow.getItem(1).low &&
                // (bull) 2nd: close near the low
                this.slidingWindow.getItem(2).close <= this.slidingWindow.getItem(2).low +
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal, this.slidingWindow.getItem(2))
            )
                ||
                // (bear) 4th: higher high and higher low
                (inputData.high > this.slidingWindow.getItem(1).high && inputData.low > this.slidingWindow.getItem(1).low &&
                    // (bull) 2nd: close near the top
                    this.slidingWindow.getItem(2).close >= this.slidingWindow.getItem(2).high -
                    CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal,
                        this.slidingWindow.getItem(2))
                )
            )
        ) {
            this.patternResult = 100 * (inputData.high < this.slidingWindow.getItem(1).high ? 1 : -1);
            this.patternIndex = this.slidingWindow.samples - 1;
            this.setCurrentValue(this.patternResult);
        } else {
            // search for confirmation if modified hikkake was no more than 3 bars ago
            if (this.slidingWindow.samples <= this.patternIndex + 4 &&
                // close higher than the high of 3rd
                ((this.patternResult > 0 && inputData.close >
                    this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).high)
                    ||
                    // close lower than the low of 3rd
                    (this.patternResult < 0 && inputData.close <
                        this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).low))
            ) {
                this.setCurrentValue(this.patternResult + 100 * (this.patternResult > 0 ? 1 : -1));
                this.patternIndex = 0;
            } else {
                this.setCurrentValue(0);
            }
        }

        // add the current range and subtract the first range: this is done after the pattern recognition 
        // when avgPeriod is not 0, that means "compare with the previous candles" (it excludes the current candle)

        this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(this.nearAveragePeriod + 5));
        return this.isReady;
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >=
            this.slidingWindow.period - this.nearAveragePeriod - 3 && this.slidingWindow.samples < this.slidingWindow.period - 3) {
            this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2));
        } else if (this.slidingWindow.samples >= this.slidingWindow.period - 3) {
            // copy here the pattern recognition code below
            // 2nd: lower high and higher low than 1st
            if (this.slidingWindow.getItem(2).high < this.slidingWindow.getItem(3).high &&
                this.slidingWindow.getItem(2).low > this.slidingWindow.getItem(3).low &&
                // 3rd: lower high and higher low than 2nd
                this.slidingWindow.getItem(1).high < this.slidingWindow.getItem(2).high &&
                this.slidingWindow.getItem(1).low > this.slidingWindow.getItem(2).low &&
                // (bull) 4th: lower high and lower low
                ((inputData.high < this.slidingWindow.getItem(1).high && inputData.low < this.slidingWindow.getItem(1).low &&
                    // (bull) 2nd: close near the low
                    this.slidingWindow.getItem(2).close <= this.slidingWindow.getItem(2).low +
                    CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal,
                        this.slidingWindow.getItem(2))
                )
                    ||
                    // (bear) 4th: higher high and higher low
                    (inputData.high > this.slidingWindow.getItem(1).high && inputData.low > this.slidingWindow.getItem(1).low &&
                        // (bull) 2nd: close near the top
                        this.slidingWindow.getItem(2).close >= this.slidingWindow.getItem(2).high -
                        CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal,
                            this.slidingWindow.getItem(2))
                    )
                )
            ) {
                this.patternResult = (inputData.high < this.slidingWindow.getItem(1).high ? 1 : -1);
                this.patternIndex = this.slidingWindow.samples - 1;
            } else {
                // search for confirmation if modified hikkake was no more than 3 bars ago
                if (this.slidingWindow.samples <= this.patternIndex + 4 &&
                    // close higher than the high of 3rd
                    ((this.patternResult > 0 && inputData.close >
                        this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).high)
                        ||
                        // close lower than the low of 3rd
                        (this.patternResult < 0 && inputData.close <
                            this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).low))
                ) {
                    this.patternIndex = 0;
                }
            }

            // add the current range and subtract the first range: this is done after the pattern recognition 
            // when avgPeriod is not 0, that means "compare with the previous candles" (it excludes the current candle)

            this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(2)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near,
                    this.slidingWindow.getItem(this.slidingWindow.samples - 1));
        }
    }
}
