import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLSTICKSANDWICH_INDICATOR_NAME: string = "CDLSTICKSANDWICH";

export class CDLSTICKSANDWICH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLSTICKSANDWICH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
