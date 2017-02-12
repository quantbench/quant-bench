import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ADX
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

    constructor(timePeriod: number = ADX.TIMEPERIOD_DEFAULT) {
        super(ADX.INDICATOR_NAME, ADX.INDICATOR_DESCR);

        if (timePeriod < ADX.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ADX.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = this.timePeriod * -1;

        this.dx = new indicators.DX(timePeriod);
        this.dx.on("data", (data: number) => this.receiveDXData(data));
        this.currentDX = 0;
        this.sumDX = 0;
        this.previousAdx = 0;

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

            let result = this.sumDX / this.timePeriod;

            this.setCurrentValue(result);

            this.previousAdx = result;
        } else {
            let result = (this.previousAdx * (this.timePeriod - 1) + this.currentDX) / this.timePeriod;

            this.setCurrentValue(result);

            this.previousAdx = result;
        }
    }
}
