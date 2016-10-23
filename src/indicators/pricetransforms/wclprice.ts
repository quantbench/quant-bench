import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const WCLPRICE_INDICATOR_NAME: string = "WCLPRICE";

export class WCLPRICE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(WCLPRICE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
