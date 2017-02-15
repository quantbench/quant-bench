import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class LongLine
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLLONGLINE";
    static INDICATOR_DESCR: string = "Long Line Candle";

    private bodyLongPeriodTotal: number;

    private bodyLongAveragePeriod: number;

    private shadowShortPeriodTotal: number;

    private shadowShortAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private firstCandle: marketData.PriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(LongLine.INDICATOR_NAME, LongLine.INDICATOR_DESCR);
        this.shadowShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowShortPeriodTotal = 0;

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;

        const lookback = Math.max(this.shadowShortAveragePeriod, this.bodyLongAveragePeriod);
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

        if (CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getLowerShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal, this.firstCandle)
        ) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

        this.shadowShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                this.slidingWindow.getItem(this.shadowShortAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowShortAveragePeriod) {
            this.shadowShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort, inputData);
        }
    }
}

export class CDLLONGLINE extends LongLine {

}
