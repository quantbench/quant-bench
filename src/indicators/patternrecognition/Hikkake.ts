import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Hikkake
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "CDLHIKKAKE";
    static INDICATOR_DESCR: string = "Hikkake Pattern";

    private patternIndex: number;

    private patternResult: number;

    private slidingWindow: SlidingWindow<marketData.PriceBar>;

    constructor() {
        super(Hikkake.INDICATOR_NAME, Hikkake.INDICATOR_DESCR);

        const lookback = 5;
        this.slidingWindow = new SlidingWindow<marketData.PriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        // 1st + 2nd: lower high and higher low
        if (this.slidingWindow.getItem(1).high < this.slidingWindow.getItem(2).high && this.slidingWindow.getItem(1).low >
            this.slidingWindow.getItem(2).low &&
            // (bull) 3rd: lower high and lower low
            ((inputData.high < this.slidingWindow.getItem(1).high && inputData.low < this.slidingWindow.getItem(1).low)
                ||
                // (bear) 3rd: higher high and higher low
                (inputData.high > this.slidingWindow.getItem(1).high && inputData.low > this.slidingWindow.getItem(1).low)
            )
        ) {
            this.patternResult = 100 * (inputData.high < this.slidingWindow.getItem(1).high ? 1 : -1);
            this.patternIndex = this.slidingWindow.samples - 1;
            this.setCurrentValue(this.patternResult);
        } else {
            // search for confirmation if hikkake was no more than 3 bars ago
            if (this.slidingWindow.samples <= this.patternIndex + 4 &&
                // close higher than the high of 2nd
                ((this.patternResult > 0 && inputData.close >
                    this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).high)
                    ||
                    // close lower than the low of 2nd
                    (this.patternResult < 0 && inputData.close <
                        this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).low)
                )
            ) {
                this.setCurrentValue(this.patternResult + 100 * (this.patternResult > 0 ? 1 : -1));
                this.patternIndex = 0;
            } else {
                this.setCurrentValue(0);
            }
        }
        return this.isReady;
    }

    private seedSlidingWindow(inputData: marketData.PriceBar) {
        if (this.slidingWindow.samples > 3) {
            if (this.slidingWindow.getItem(1).high <
                this.slidingWindow.getItem(2).high && this.slidingWindow.getItem(1).low > this.slidingWindow.getItem(2).low &&
                // (bull) 3rd: lower high and lower low
                ((inputData.high < this.slidingWindow.getItem(1).high && inputData.low < this.slidingWindow.getItem(1).low)
                    ||
                    // (bear) 3rd: higher high and higher low
                    (inputData.high > this.slidingWindow.getItem(1).high && inputData.low > this.slidingWindow.getItem(1).low)
                )
            ) {
                this.patternResult = (inputData.high < this.slidingWindow.getItem(1).high ? 1 : -1);
                this.patternIndex = this.slidingWindow.samples - 1;
            } else
                // search for confirmation if hikkake was no more than 3 bars ago
                if (this.slidingWindow.samples <= this.patternIndex + 4 &&
                    // close higher than the high of 2nd
                    ((this.patternResult > 0 && inputData.close >
                        this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).high)
                        ||
                        // close lower than the low of 2nd
                        (this.patternResult < 0 && inputData.close <
                            this.slidingWindow.getItem(this.slidingWindow.samples - this.patternIndex).low)
                    )
                ) {
                    this.patternIndex = 0;
                }
        }
    }
}

export class CDLHIKKAKE extends Hikkake {

}
