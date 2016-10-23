import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ULTOSC_INDICATOR_NAME: string = "ULTOSC";

export class ULTOSC
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ULTOSC_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
