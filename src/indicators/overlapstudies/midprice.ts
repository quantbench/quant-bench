import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MIDPRICE_INDICATOR_NAME: string = "MIDPRICE";

export class MIDPRICE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MIDPRICE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
