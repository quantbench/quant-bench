import * as indicators from "../";
import * as marketData from "../../data/market/";

export class Aroon
    extends indicators.AbstractIndicatorBase<marketData.PriceBar> {

    static INDICATOR_NAME: string = "AROON";
    static INDICATOR_DESCR: string = "Aroon";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private aroonUpInternal: number;
    private aroonDownInternal: number;

    private aroonFactor: number;
    private periodCounter: number;
    private periodHighHistory: indicators.Queue<number>;
    private periodLowHistory: indicators.Queue<number>;

    constructor(timePeriod: number = Aroon.TIMEPERIOD_DEFAULT) {
        super(Aroon.INDICATOR_NAME, Aroon.INDICATOR_DESCR);

        if (timePeriod < Aroon.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Aroon.TIMEPERIOD_MIN, timePeriod)));
        }

        this.aroonUpInternal = 0;
        this.aroonDownInternal = 0;

        this.timePeriod = timePeriod;
        this.periodCounter = (this.timePeriod + 1) * -1;
        this.periodHighHistory = new indicators.Queue<number>();
        this.periodLowHistory = new indicators.Queue<number>();
        this.aroonFactor = 100 / this.timePeriod;

        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter += 1;
        this.periodHighHistory.enqueue(inputData.high);
        this.periodLowHistory.enqueue(inputData.low);

        if (this.periodHighHistory.count > (1 + this.lookback)) {
            this.periodHighHistory.dequeue();
            this.periodLowHistory.dequeue();
        }

        if (this.periodCounter >= 0) {
            let aroonUp: number = 0;
            let aroonDown: number = 0;

            let highValue = Number.MIN_VALUE;
            let highIdx = -1;
            let i = (1 + this.lookback);

            this.periodHighHistory.toArray().forEach((value: number) => {
                i--;
                if (highValue <= value) {
                    highValue = value;
                    highIdx = i;
                }
            });

            let daysSinceHigh = highIdx;

            let lowValue = Number.MAX_VALUE;
            let lowIdx = -1;
            i = (1 + this.lookback);

            this.periodLowHistory.toArray().forEach((value) => {
                i--;
                if (lowValue >= value) {
                    lowValue = value;
                    lowIdx = i;
                }
            });

            let daysSinceLow = lowIdx;

            aroonUp = this.aroonFactor * (this.lookback - daysSinceHigh);
            aroonDown = this.aroonFactor * (this.lookback - daysSinceLow);

            this.setCurrentValue(aroonUp, aroonDown);
        }

        return this.isReady;
    }

    public get aroonUp(): number {
        return this.aroonUpInternal;
    }

    public get aroonDown(): number {
        return this.aroonDownInternal;
    }

    protected setCurrentValue(aroonUp: number, aroonDown: number) {
        this.aroonDownInternal = aroonDown;
        this.aroonUpInternal = aroonUp;
        this.emit("data", this.aroonUp, this.aroonDown);
        this.setIsReady();
    }
}

export class AROON extends Aroon {

}
