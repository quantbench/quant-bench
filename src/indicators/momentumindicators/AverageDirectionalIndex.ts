import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AverageDirectionalIndex
    extends indicators.AbstractIndicator<marketData.PriceBar>
    implements indicators.IIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "ADX";
    static INDICATOR_DESCR: string = "Average Directional Movement Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private dx: indicators.DX;
    private currentDX: number;
    private sumDX: number;
    private previousAdx: number;
    private currentAdx: number;

    constructor(timePeriod: number = AverageDirectionalIndex.TIMEPERIOD_DEFAULT) {
        super(AverageDirectionalIndex.INDICATOR_NAME, AverageDirectionalIndex.INDICATOR_DESCR);

        if (timePeriod < AverageDirectionalIndex.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, AverageDirectionalIndex.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = this.timePeriod * -1;

        this.dx = new indicators.DX(timePeriod);
        this.dx.on("data", (data: number) => this.receiveDXData(data));
        this.currentDX = 0;
        this.sumDX = 0;
        this.previousAdx = 0;
        this.currentAdx = 0;

        this.setLookBack(2 * this.timePeriod - 1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.dx.receiveData(inputData);
        return this.isReady;
    }

    private receiveDXData(data: number) {
        this.currentDX = data;
        this.periodCounter += 1;

        if (this.periodCounter < 0) {
            this.sumDX += this.currentDX;
        } else if (this.periodCounter === 0) {
            this.sumDX += this.currentDX;

            this.currentAdx = this.sumDX / this.timePeriod;

            this.setCurrentValue(this.currentAdx);

            this.previousAdx = this.currentAdx;
        } else {
            this.currentAdx = (this.previousAdx * (this.timePeriod - 1) + this.currentDX) / this.timePeriod;

            this.setCurrentValue(this.currentAdx);

            this.previousAdx = this.currentAdx;
        }
    }
}

export class ADX extends AverageDirectionalIndex {

}
