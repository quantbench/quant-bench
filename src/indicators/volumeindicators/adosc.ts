import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ADOSC_INDICATOR_NAME: string = "ADOSC";

export class ADOSC
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ADOSC_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
