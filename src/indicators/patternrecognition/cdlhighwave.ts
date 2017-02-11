import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLHIGHWAVE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHIGHWAVE";
    static INDICATOR_DESCR: string = "High-Wave Candle";

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private shadowVeryLongPeriodTotal: number;

    private shadowVeryLongAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLHIGHWAVE.INDICATOR_NAME, CDLHIGHWAVE.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;
        this.shadowVeryLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryLong).averagePeriod;
        this.shadowVeryLongPeriodTotal = 0;

        const lookback = Math.max(this.bodyShortAveragePeriod, this.shadowVeryLongAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        if (CandleStickUtils.getRealBody(inputData) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, inputData) &&
            CandleStickUtils.getUpperShadow(inputData) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryLong, this.shadowVeryLongPeriodTotal, inputData) &&
            CandleStickUtils.getLowerShadow(inputData) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryLong, this.shadowVeryLongPeriodTotal, inputData)
        ) {
            this.setCurrentValue(CandleStickUtils.getCandleColor(inputData) * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

        this.shadowVeryLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong,
                this.slidingWindow.getItem(this.shadowVeryLongAveragePeriod));

        return this.isReady;
    }
    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryLongAveragePeriod) {
            this.shadowVeryLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryLong, inputData);
        }
    }
}
