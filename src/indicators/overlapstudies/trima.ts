import * as indicators from "../";

export class TRIMA
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "TRIMA";
    static INDICATOR_DESCR: string = "Triangular Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private currentSMA: number;
    private sma1: indicators.SMA;
    private sma2: indicators.SMA;

    constructor(timePeriod: number = TRIMA.TIMEPERIOD_DEFAULT) {
        super(TRIMA.INDICATOR_NAME, TRIMA.INDICATOR_DESCR);

        if (timePeriod < TRIMA.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, TRIMA.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;

        let sma1Period: number = 0;
        let sma2Period: number = 0;

        if (timePeriod % 2 === 0) {
            // even
            sma1Period = timePeriod / 2;
            sma2Period = (timePeriod / 2) + 1;
        } else {
            // odd
            sma1Period = (timePeriod + 1) / 2;
            sma2Period = (timePeriod + 1) / 2;
        }

        this.sma1 = new indicators.SMA(sma1Period);
        this.sma1.on("data", (data: number) => this.receiveSMA1Data(data));
        this.sma2 = new indicators.SMA(sma2Period);
        this.sma2.on("data", (data: number) => this.receiveSMA2Data(data));
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.sma1.receiveData(inputData);
        return this.isReady;
    }

    private receiveSMA1Data(data: number) {
            this.currentSMA = data;
            this.sma2.receiveData(data);
    }

    private receiveSMA2Data(data: number) {
        this.setCurrentValue(data);
    }
}
