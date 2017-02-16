import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class SeparatingLines
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLSEPARATINGLINES";
    static INDICATOR_DESCR: string = "Separating Lines";

    private bodyLongAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private shadowVeryShortAveragePeriod: number;
    private shadowVeryShortPeriodTotal: number;
    private equalAveragePeriod: number;
    private equalPeriodTotal: number;

    private firstCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;

    private firstCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(SeparatingLines.INDICATOR_NAME, SeparatingLines.INDICATOR_DESCR);

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = 0;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.equalAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Equal).averagePeriod;
        this.equalPeriodTotal = 0;

        const lookback = Math.max(Math.max(this.shadowVeryShortAveragePeriod, this.bodyLongAveragePeriod), this.equalAveragePeriod) + 1;
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

        if (this.firstCandSecondCandlesAreOfOppositeColor() &&
            this.firstAndSecondCandleHaveSameOpen() &&
            this.theCandlesExhibitALongBodyBeltHold()) {
            this.setCurrentValue(this.secondCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.shadowVeryShortPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod));

        this.bodyLongPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod));

        this.equalPeriodTotal +=
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal,
                this.slidingWindow.getItem(this.equalAveragePeriod + 1));

        return this.isReady;
    }

    private populateCandleVariables() {

        this.firstCandle = this.slidingWindow.getItem(1);
        this.secondCandle = this.slidingWindow.getItem(0);

        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.equalAveragePeriod) {
            this.equalPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1));
        }
    }

    private firstCandSecondCandlesAreOfOppositeColor() {
        return this.firstCandleColor === -1 * this.secondCandleColor;
    }

    private firstAndSecondCandleHaveSameOpen() {
        return this.secondCandle.open <= this.firstCandle.open +
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle) &&
            this.secondCandle.open >= this.firstCandle.open -
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Equal, this.equalPeriodTotal, this.firstCandle);
    }

    private theCandlesExhibitALongBodyBeltHold() {
        return CandleStickUtils.getRealBody(this.secondCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.secondCandle) &&
            (
                // with no lower shadow if bullish
                (this.secondCandleColor === candleEnums.CandleColor.White &&
                    CandleStickUtils.getLowerShadow(this.secondCandle) <
                    CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                        this.shadowVeryShortPeriodTotal, this.secondCandle)
                )
                ||
                // with no upper shadow if bearish
                (this.secondCandleColor === candleEnums.CandleColor.Black &&
                    CandleStickUtils.getUpperShadow(this.secondCandle) <
                    CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort,
                        this.shadowVeryShortPeriodTotal, this.secondCandle)
                )
            );
    }
}

export class CDLSEPARATINGLINES extends SeparatingLines {

}
