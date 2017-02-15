import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLCONCEALBABYSWALL
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLCONCEALBABYSWALL";
    static INDICATOR_DESCR: string = "Concealing Baby Swallow";

    private shadowVeryShortPeriodTotal: number[];
    private shadowVeryShortAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private fourthCandle: marketData.PriceBar;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private fourthCandleColor: candleEnums.CandleColor;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLCONCEALBABYSWALL.INDICATOR_NAME, CDLCONCEALBABYSWALL.INDICATOR_DESCR);

        this.shadowVeryShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.ShadowVeryShort).averagePeriod;
        this.shadowVeryShortPeriodTotal = new Array<number>(3);
        for (let i = 0; i < this.shadowVeryShortPeriodTotal.length; i++) {
            this.shadowVeryShortPeriodTotal[i] = 0;
        }

        const lookback = this.shadowVeryShortAveragePeriod + 3;
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

        if (this.allFourCandlesAreBlack() &&
            this.firstAndSecondAreMarubozu() &&
            this.thirdGapsDownWithAnUpperShadowExtedingIntoPriorBody() &&
            this.fourthEngulfsThirdIncludingShadows()
        ) {
            this.setCurrentValue(100);
        } else {
            this.setCurrentValue(0);
        }

        for (let i = 3; i >= 1; i--) {
            this.shadowVeryShortPeriodTotal[i] +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort, this.slidingWindow.getItem(i)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                    this.slidingWindow.getItem(i + this.shadowVeryShortAveragePeriod));
        }

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(3);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);

        this.secondCandle = this.slidingWindow.getItem(2);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);

        this.thirdCandle = this.slidingWindow.getItem(1);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);

        this.fourthCandle = this.slidingWindow.getItem(0);
        this.fourthCandleColor = CandleStickUtils.getCandleColor(this.fourthCandle);
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.shadowVeryShortAveragePeriod) {
            this.shadowVeryShortPeriodTotal[3] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(3));
            this.shadowVeryShortPeriodTotal[2] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(2));
            this.shadowVeryShortPeriodTotal[1] += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.ShadowVeryShort,
                this.slidingWindow.getItem(1));
        }
    }

    private allFourCandlesAreBlack() {
        // 1st black
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            // 2nd black
            this.secondCandleColor === candleEnums.CandleColor.Black &&
            // 3rd black
            this.thirdCandleColor === candleEnums.CandleColor.Black &&
            // 4th black
            this.fourthCandleColor === candleEnums.CandleColor.Black;
    }

    private firstAndSecondAreMarubozu() {
        // 1st marabuzo
        return CandleStickUtils.getLowerShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal[3],
                this.firstCandle) &&
            CandleStickUtils.getUpperShadow(this.firstCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal[3],
                this.firstCandle) &&
            // 2nd: marubozu
            CandleStickUtils.getLowerShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal[2],
                this.secondCandle) &&
            CandleStickUtils.getUpperShadow(this.secondCandle) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal[2],
                this.secondCandle);
    }

    private thirdGapsDownWithAnUpperShadowExtedingIntoPriorBody() {
        // opens gapping down
        return CandleStickUtils.getRealBodyGapDown(this.thirdCandle, this.secondCandle) &&
            // and has an upper shadow
            CandleStickUtils.getUpperShadow(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.ShadowVeryShort, this.shadowVeryShortPeriodTotal[1],
                this.thirdCandle) &&
            // that extends into the prior body
            this.thirdCandle.high > this.secondCandle.close;
    }

    private fourthEngulfsThirdIncludingShadows() {
        return this.fourthCandle.high > this.thirdCandle.high && this.fourthCandle.low < this.thirdCandle.low;
    }
}
