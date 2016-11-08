import * as indicators from "../";

export enum MA_TYPE {
    SMA,
    EMA,
    WMA,
    DEMA,
    TEMA,
    TRIMA,
    KAMA,
    MAMA,
    T3
}

export class MA
    extends indicators.AbstractIndicator<number> {

    static MINDICATOR_NAME: string = "MA";
    static MINDICATOR_DESCR: string = "Moving average";

    constructor() {
        super(MA.MINDICATOR_NAME, MA.MINDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
