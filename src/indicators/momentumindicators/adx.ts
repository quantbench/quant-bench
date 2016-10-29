import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ADX
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static INDICATOR_NAME: string = "ADX";
    static INDICATOR_DESCR: string = "Average Directional Movement Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    periodCounter: number;
    // Dx dx;
    currentDX: number;
    sumDX: number;
    previousAdx: number;

    constructor(timePeriod: number) {
        super(ADX.INDICATOR_NAME, ADX.INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = ADX.TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < ADX.TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, ADX.TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.periodCounter = this.timePeriod * -1;

        this.currentDX = 0;
        this.sumDX = 0;
        this.previousAdx = 0;
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
