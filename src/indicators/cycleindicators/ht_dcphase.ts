import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTDCPHASE_INDICATOR_NAME: string = "HTDCPHASE";

export class HTDCPHASE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTDCPHASE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
