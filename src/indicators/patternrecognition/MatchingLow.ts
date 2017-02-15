import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class MatchingLow
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLMATCHINGLOW";
    static INDICATOR_DESCR: string = "Matching Low";

    private equalPeriodTotal: number;
    private equalAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(MatchingLow.INDICATOR_NAME, MatchingLow.INDICATOR_DESCR);

        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.equalPeriodTotal = 0;

        const lookback = this.equalAveragePeriod + 1;
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

    private seedSlidingWindow(inputData: marketData.PriceBar) {
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

export class CDLMATCHINGLOW extends MatchingLow {

}
