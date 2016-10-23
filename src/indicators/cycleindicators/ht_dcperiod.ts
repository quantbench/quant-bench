import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTDCPERIOD_INDICATOR_NAME: string = "HTDCPERIOD";

export class HTDCPERIOD
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTDCPERIOD_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
