import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLEVENINGDOJISTAR_INDICATOR_NAME: string = "CDLEVENINGDOJISTAR";

export class CDLEVENINGDOJISTAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLEVENINGDOJISTAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
