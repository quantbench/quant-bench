import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDL3OUTSIDE
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDL3OUTSIDE";
    static INDICATOR_DESCR: string = "Three Outside Up/Down";

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    private thirdCandle: marketData.PriceBar;
    private secondCandle: marketData.PriceBar;
    private firstCandle: marketData.PriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDL3OUTSIDE.INDICATOR_NAME, CDL3OUTSIDE.INDICATOR_DESCR);

        const lookback = 3;
        this.slidingWindow = new SlidingWindow<marketData.PriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            return this.isReady;
        }

        this.populateCandleVariables();

        if (this.firstBlackCandleIsEngulfedByRisingWhiteCandles() ||
            this.firstWhiteCandleIsEngulfedByFallingBlackCandles()) {
            this.setCurrentValue(this.secondCandleColor * 100);
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

    private firstBlackCandleIsEngulfedByRisingWhiteCandles(): boolean {
        return this.firstCandleColor === candleEnums.CandleColor.Black &&
            this.secondCandleColor === candleEnums.CandleColor.White &&
            this.secondCandle.close > this.firstCandle.open &&
            this.secondCandle.open < this.firstCandle.close &&
            this.thirdCandle.close > this.secondCandle.close;
    }

    private firstWhiteCandleIsEngulfedByFallingBlackCandles(): boolean {
        return this.firstCandleColor === candleEnums.CandleColor.White &&
            this.secondCandleColor === candleEnums.CandleColor.Black &&
            this.secondCandle.open > this.firstCandle.close &&
            this.secondCandle.close < this.firstCandle.open &&
            this.thirdCandle.close < this.secondCandle.close;
    }
}
