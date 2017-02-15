import * as indicators from "../";
import { MA_TYPE } from "../MovingAverageType";

export class MovingAverage
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MA";
    static INDICATOR_DESCR: string = "Moving average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;
    static MATYPE_DEFAULT = MA_TYPE.SMA;

    public timePeriod: number;
    public maType: MA_TYPE;
    private ma: indicators.INumericDataIndicator;

    constructor(timePeriod: number = MovingAverage.TIMEPERIOD_DEFAULT, maType: MA_TYPE = MovingAverage.MATYPE_DEFAULT) {
        super(MovingAverage.INDICATOR_NAME, MovingAverage.INDICATOR_DESCR);

        if (timePeriod < MovingAverage.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MovingAverage.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;

        switch (maType) {
            case MA_TYPE.DEMA:
                this.ma = new indicators.DEMA(this.timePeriod);
                this.maType = MA_TYPE.DEMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.EMA:
                this.ma = new indicators.EMA(this.timePeriod);
                this.maType = MA_TYPE.EMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.KAMA:
                this.ma = new indicators.KAMA(this.timePeriod);
                this.maType = MA_TYPE.KAMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.SMA:
                this.ma = new indicators.SMA(this.timePeriod);
                this.maType = MA_TYPE.SMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.T3:
                this.ma = new indicators.T3(this.timePeriod);
                this.maType = MA_TYPE.T3;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.TEMA:
                this.ma = new indicators.TEMA(this.timePeriod);
                this.maType = MA_TYPE.TEMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.TRIMA:
                this.ma = new indicators.TRIMA(this.timePeriod);
                this.maType = MA_TYPE.TRIMA;
                this.setLookBack(this.ma.lookback);
                break;
            case MA_TYPE.WMA:
                this.ma = new indicators.WMA(this.timePeriod);
                this.maType = MA_TYPE.WMA;
                this.setLookBack(this.ma.lookback);
                break;
            default:
        }

    }

    receiveData(inputData: number): boolean {
        if (this.ma.receiveData(inputData)) {
            this.setCurrentValue(this.ma.currentValue);
        }
        return this.isReady;
    }
}

export class MA extends MovingAverage {

}
