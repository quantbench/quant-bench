import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MEDPRICE_INDICATOR_NAME: string = "MEDPRICE";

export class MEDPRICE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MEDPRICE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
