import * as indicators from "../";
import * as marketData from "../../data/market/";

export class DX
    extends indicators.AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static INDICATOR_NAME: string = "DX";
    static INDICATOR_DESCR: string = "Directional Movement Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private minusDI: indicators.MINUSDI;
    private plusDI: indicators.PLUSDI;
    private currentPlusDi: number;
    private currentMinusDi: number;

    constructor(timePeriod: number = DX.TIMEPERIOD_DEFAULT) {
        super(DX.INDICATOR_NAME, DX.INDICATOR_DESCR);

        if (timePeriod < DX.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, DX.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.minusDI = new indicators.MINUSDI(timePeriod);
        this.minusDI.on("data", (data: number) => this.receiveMinusDIData(data));
        this.currentPlusDi = 0;
        this.plusDI = new indicators.PLUSDI(timePeriod);
        this.plusDI.on("data", (data: number) => this.receivePlusDIData(data));
        this.currentPlusDi = 0;

        this.setLookBack(timePeriod);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.minusDI.receiveData(inputData);
        this.plusDI.receiveData(inputData);
        return this.isReady;
    }

    private receiveMinusDIData(data: number) {
        this.currentMinusDi = data;
    }

    private receivePlusDIData(data: number) {
        this.currentPlusDi = data;

        let result = 0;
        let tmp = this.currentMinusDi + this.currentPlusDi;
        if (tmp !== 0) {
            result = 100 * (Math.abs(this.currentMinusDi - this.currentPlusDi) / tmp);
        } else {
            result = 0;
        }

        this.setCurrentValue(result);
    }
}
