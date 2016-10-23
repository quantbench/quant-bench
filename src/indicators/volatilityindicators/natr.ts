import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const NATR_INDICATOR_NAME: string = "NATR";

export class NATR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(NATR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
