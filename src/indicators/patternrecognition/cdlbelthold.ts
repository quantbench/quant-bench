import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
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

    constructor() {
        super(CDLBELTHOLD.INDICATOR_NAME, CDLBELTHOLD.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;

        this.bodyVeryShortPeriodTotal = 0;
        this.bodyLongPeriodTotal = 0;
        this.periodCounter = -1;

        let lookback = Math.max(this.bodyLongAveragePeriod, this.bodyVeryShortAveragePeriod);
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
