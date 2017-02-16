import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class UpDownGapThreeMethods
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLXSIDEGAP3METHODS";
    static INDICATOR_DESCR: string = "Upside/Downside Gap Three Methods";

    private slidingWindow: SlidingWindow<marketData.PriceBar>;
    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(UpDownGapThreeMethods.INDICATOR_NAME, UpDownGapThreeMethods.INDICATOR_DESCR);

        const lookback = 2;
        this.slidingWindow = new SlidingWindow<marketData.PriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            return this.isReady;
        }

        this.populateCandleVariables();

        if (this.firstAndSecondCandlesHaveSameColorThirdIsOpposite() &&
            this.thirdCandleOpensWithinSecondREalBodyAndClosesWithinFirst() &&
            (this.ifFirstCandleIsBlackSecondShouldGapDown() || this.ifFirstCandleIsWhiteSecondSHouldGapUp())) {
            this.setCurrentValue(this.firstCandleColor * 100);
        } else {
            this.setCurrentValue(0);
        }
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

    private firstAndSecondCandlesHaveSameColorThirdIsOpposite() {
        return this.firstCandleColor === this.secondCandleColor &&
            this.thirdCandleColor !== this.firstCandleColor;
    }

    private thirdCandleOpensWithinSecondREalBodyAndClosesWithinFirst() {
        return this.thirdCandle.open < Math.max(this.secondCandle.close, this.secondCandle.open) &&
            this.thirdCandle.open > Math.min(this.secondCandle.close, this.secondCandle.open) &&
            this.thirdCandle.close < Math.max(this.firstCandle.close, this.firstCandle.open) &&
            this.thirdCandle.close > Math.min(this.firstCandle.close, this.firstCandle.open);
    }

    private ifFirstCandleIsWhiteSecondSHouldGapUp() {
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
    }

    private ifFirstCandleIsBlackSecondShouldGapDown() {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBodyGapDown(this.secondCandle, this.firstCandle);

    }
}

export class CDLXSIDEGAP3METHODS extends UpDownGapThreeMethods {

}
