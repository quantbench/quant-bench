import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLSPINNINGTOP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSPINNINGTOP";
    static INDICATOR_DESCR: string = "Spinning Top";

    private bodyShortAveragePeriod: number;
    private bodyShortPeriodTotal: number;
    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLSPINNINGTOP.INDICATOR_NAME, CDLSPINNINGTOP.INDICATOR_DESCR);

        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        this.firstCandle = undefined;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        const lookback = this.bodyShortAveragePeriod;
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
            CandleStickUtils.getUpperShadow(this.firstCandle) > CandleStickUtils.getRealBody(this.firstCandle) &&
            CandleStickUtils.getLowerShadow(this.firstCandle) > CandleStickUtils.getRealBody(this.firstCandle)
        ) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

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
    }
}
