import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../slidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLTASUKIGAP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLTASUKIGAP";
    static INDICATOR_DESCR: string = "Tasuki Gap";

    private nearAveragePeriod: number;
    private nearPeriodTotal: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;
    private thirdCandle: marketData.IPriceBar;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLTASUKIGAP.INDICATOR_NAME, CDLTASUKIGAP.INDICATOR_DESCR);

        this.nearAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.Near).averagePeriod;
        this.nearPeriodTotal = 0;

        const lookback = this.nearAveragePeriod + 2;
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

        if ((this.startsWithUpsideGap() &&
            this.secondCandleIsWhite() &&
            this.thirdCandleIsBlack() &&
            this.thirdCandleOpensWithinAndClosesUnderWhiteRealBodyInsideTheGap() &&
            this.thirdCandleRealBodyNearlySameSizeAsSecondCandleRealBody()) ||
            (this.startsWithDownsideGap() &&
                this.secondCandleIsBlack() &&
                this.thirdCandleIsWhite() &&
                this.thirdCandleOpensWithinAndClosesAboveBlackRealBodyInsideTheGap() &&
                this.thirdCandleRealBodyNearlySameSizeAsSecondCandleRealBody())) {
            this.setCurrentValue(this.secondCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }

        this.nearPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Near, this.slidingWindow.getItem(this.nearAveragePeriod + 1));
        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(2);
        this.secondCandle = this.slidingWindow.getItem(1);
        this.thirdCandle = this.slidingWindow.getItem(0);
        this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.nearAveragePeriod) {
            this.nearPeriodTotal +=
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.Equal, this.slidingWindow.getItem(1));
        }
    }

    private startsWithUpsideGap() {
        return CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
    }

    private secondCandleIsWhite() {
        return this.secondCandleColor === candleEnums.CandleColor.White;
    }

    private thirdCandleIsWhite() {
        return this.thirdCandleColor === candleEnums.CandleColor.White;
    }

    private thirdCandleOpensWithinAndClosesUnderWhiteRealBodyInsideTheGap() {
        return this.thirdCandle.open < this.secondCandle.close && this.thirdCandle.open > this.secondCandle.open &&
            this.thirdCandle.close < this.secondCandle.open &&
            this.thirdCandle.close > Math.max(this.firstCandle.close, this.firstCandle.open);
    }

    private thirdCandleRealBodyNearlySameSizeAsSecondCandleRealBody() {
        return Math.abs(CandleStickUtils.getRealBody(this.secondCandle) - CandleStickUtils.getRealBody(this.thirdCandle)) <
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.Near, this.nearPeriodTotal, this.secondCandle);
    }

    private startsWithDownsideGap() {
        return CandleStickUtils.getRealBodyGapDown(this.secondCandle, this.firstCandle);
    }

    private secondCandleIsBlack() {
        return this.secondCandleColor === candleEnums.CandleColor.Black;
    }

    private thirdCandleIsBlack() {
        return this.thirdCandleColor === candleEnums.CandleColor.Black;
    }

    private thirdCandleOpensWithinAndClosesAboveBlackRealBodyInsideTheGap() {
        return this.thirdCandle.open < this.secondCandle.open && this.thirdCandle.open > this.secondCandle.close &&
            this.thirdCandle.close > this.secondCandle.open &&
            this.thirdCandle.close < Math.min(this.firstCandle.close, this.firstCandle.open);
    }
}
