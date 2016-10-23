import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TYPPRICE_INDICATOR_NAME: string = "TYPPRICE";

export class TYPPRICE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TYPPRICE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
