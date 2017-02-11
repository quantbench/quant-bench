import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLSHORTLINE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSHORTLINE";
    static INDICATOR_DESCR: string = "Short Line Candle";

    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;
    private shadowShortAveragePeriod: number;
    private shadowShortPeriodTotal: number;

    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLSHORTLINE.INDICATOR_NAME, CDLSHORTLINE.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;
        this.shadowShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowShort).averagePeriod;
        this.shadowShortPeriodTotal = 0;

        const lookback = Math.max(this.shadowShortAveragePeriod, this.bodyShortAveragePeriod);
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

        if (CandleStickUtils.getRealBody(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal, this.firstCandle) &&
            CandleStickUtils.getLowerShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowShort, this.shadowShortPeriodTotal, this.firstCandle)
        ) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

        this.shadowShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort,
                this.slidingWindow.getItem(this.shadowShortAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(0);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowShortAveragePeriod) {
            this.shadowShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowShort, inputData);
        }
    }
}
