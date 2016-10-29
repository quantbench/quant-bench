import * as indicators from "../";

export class DEMA
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "DEMA";
    static INDICATOR_DESCR: string = "Double Exponential Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private currentEMA: number;
    private ema1: indicators.EMA;
    private ema2: indicators.EMA;

    constructor(timePeriod: number = DEMA.TIMEPERIOD_DEFAULT) {
        super(DEMA.INDICATOR_NAME, DEMA.INDICATOR_DESCR);

        if (timePeriod < DEMA.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, DEMA.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.ema1 = new indicators.EMA(timePeriod);
        this.ema1.on("data", (data: number) => this.receiveEMA1Data(data));
        this.ema2 = new indicators.EMA(timePeriod);
        this.ema2.on("data", (data: number) => this.receiveEMA2Data(data));
        this.setLookBack(2 * (this.timePeriod - 1));
    }

    receiveData(inputData: number): boolean {
        this.ema1.receiveData(inputData);
        return this.isReady;
    }

    private receiveEMA1Data(data: number) {
        this.currentEMA = data;
        this.ema2.receiveData(data);
    }

    private receiveEMA2Data(inputData: number) {
        this.setCurrentValue((2 * this.currentEMA) - inputData);
    }
}
