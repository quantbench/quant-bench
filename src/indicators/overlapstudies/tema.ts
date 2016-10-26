import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TEMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TEMA_INDICATOR_NAME: string = "TEMA";
    static TEMA_INDICATOR_DESCR: string = "Triple Exponential Moving Average";
    static TEMA_TIMEPERIOD_DEFAULT: number = 30;
    static TEMA_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    currentEMA: number;
    currentEMA2: number;
    ema1: indicators.EMA;
    ema2: indicators.EMA;
    ema3: indicators.EMA;

    constructor(timePeriod: number) {
        super(TEMA.TEMA_INDICATOR_NAME, TEMA.TEMA_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = TEMA.TEMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < TEMA.TEMA_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, TEMA.TEMA_TIMEPERIOD_MIN, timePeriod)));
            }
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
