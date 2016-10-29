import * as indicators from "../";

export class TEMA
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "TEMA";
    static INDICATOR_DESCR: string = "Triple Exponential Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private currentEMA: number;
    private currentEMA2: number;
    private ema1: indicators.EMA;
    private ema2: indicators.EMA;
    private ema3: indicators.EMA;

    constructor(timePeriod: number = TEMA.TIMEPERIOD_DEFAULT) {
        super(TEMA.INDICATOR_NAME, TEMA.INDICATOR_DESCR);

        if (timePeriod < TEMA.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, TEMA.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.ema1 = new indicators.EMA(timePeriod);
        this.ema1.on("data", (data: number) => this.receiveEMA1Data(data));
        this.ema2 = new indicators.EMA(timePeriod);
        this.ema2.on("data", (data: number) => this.receiveEMA2Data(data));
        this.ema3 = new indicators.EMA(timePeriod);
        this.ema3.on("data", (data: number) => this.receiveEMA3Data(data));
        this.setLookBack(3 * (this.timePeriod - 1));
    }

    receiveData(inputData: number): boolean {
        this.ema1.receiveData(inputData);
        return this.isReady;
    }

    private receiveEMA1Data(data: number) {
        this.currentEMA = data;
        this.ema2.receiveData(data);
    }

    private receiveEMA2Data(data: number) {
        this.currentEMA2 = data;
        this.ema3.receiveData(data);
    }

    private receiveEMA3Data(data: number) {
        // TEMA = (3*EMA – 3*EMA(EMA)) + EMA(EMA(EMA))
        this.setCurrentValue((3 * this.currentEMA - 3 * this.currentEMA2) + data);
    }
}
