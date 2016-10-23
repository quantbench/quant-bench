import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const AVGPRICE_INDICATOR_NAME: string = "AVGPRICE";

export class AVGPRICE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(AVGPRICE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
