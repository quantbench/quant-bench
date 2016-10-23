import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const COSH_INDICATOR_NAME: string = "COSH";

export class COSH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(COSH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
