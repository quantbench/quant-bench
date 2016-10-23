import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLMORNINGDOJISTAR_INDICATOR_NAME: string = "CDLMORNINGDOJISTAR";

export class CDLMORNINGDOJISTAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLMORNINGDOJISTAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
