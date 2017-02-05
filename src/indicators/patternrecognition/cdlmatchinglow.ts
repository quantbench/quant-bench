import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLMATCHINGLOW
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMATCHINGLOW";
    static INDICATOR_DESCR: string = "Matching Low";

    private equalPeriodTotal: number;
    private equalAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLMATCHINGLOW.INDICATOR_NAME, CDLMATCHINGLOW.INDICATOR_DESCR);

        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.equalPeriodTotal = 0;

        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.secondCandleColor = candleEnums.CandleColor.Black;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = this.equalAveragePeriod + 1;
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

        if (this.firstCandleIsBlack() &&
            this.secondCandleIsBlack() &&
            this.firstAndSecondCandleHaveSameClose()) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1)) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(this.equalAveragePeriod + 1));
        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(0);
        this.secondCandle = this.slidingWindow.getItem(1);

        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.equalAveragePeriod) {
            this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(1));
        }
    }

    private firstCandleIsBlack() {
        return this.firstCandleColor === candleEnums.CandleColor.Black;
    }

    private secondCandleIsBlack() {
        return this.secondCandleColor === candleEnums.CandleColor.Black;
    }

    private firstAndSecondCandleHaveSameClose() {
        return this.secondCandle.close <= this.firstCandle.close +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle) &&
            this.secondCandle.close >= this.firstCandle.close -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle);
    }
}
