import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLUPSIDEGAP2CROWS_INDICATOR_NAME: string = "CDLUPSIDEGAP2CROWS";

export class CDLUPSIDEGAP2CROWS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLUPSIDEGAP2CROWS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
