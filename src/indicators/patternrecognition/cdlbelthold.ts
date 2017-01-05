import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../slidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLBELTHOLD
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLBELTHOLD";
    static INDICATOR_DESCR: string = "Belt-hold";

    private bodyLongPeriodTotal: number;
    private bodyLongAveragePeriod: number;
    private bodyVeryShortPeriodTotal: number;
    private bodyVeryShortAveragePeriod: number;
    private periodCounter: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private currentCandle: marketData.IPriceBar;
    private candleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLBELTHOLD.INDICATOR_NAME, CDLBELTHOLD.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;

        this.bodyVeryShortPeriodTotal = 0;
        this.bodyLongPeriodTotal = 0;
        this.periodCounter = -1;
        this.currentCandle = undefined;
        this.candleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyLongAveragePeriod, this.bodyVeryShortAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter++;
        this.slidingWindow.add(inputData);

        if (this.periodCounter < this.lookback) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
            this.bodyVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        } else {
            this.currentCandle = inputData;
            this.candleColor = CandleStickUtils.getCandleColor(this.currentCandle);
            if (CandleStickUtils.getRealBody(this.currentCandle) >
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                    this.bodyLongPeriodTotal, this.currentCandle) && (
                    (
                        this.candleColor === candleEnums.CandleColor.White &&
                        CandleStickUtils.getLowerShadow(this.currentCandle) <
                        CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                            this.bodyVeryShortPeriodTotal, this.currentCandle)
                    )
                    || (
                        this.candleColor === candleEnums.CandleColor.Black &&
                        CandleStickUtils.getUpperShadow(this.currentCandle) <
                        CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                            this.bodyVeryShortPeriodTotal, this.currentCandle)
                    )
                )
            ) {
                this.setCurrentValue(CandleStickUtils.getCandleColor(this.currentCandle) * 100);
            } else {
                this.setCurrentValue(0);
            }

            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.currentCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(this.bodyLongAveragePeriod));

            this.bodyVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.currentCandle) - CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(this.bodyVeryShortAveragePeriod));
        }
        return this.isReady;
    }
}
