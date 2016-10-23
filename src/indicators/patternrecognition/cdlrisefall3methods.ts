import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLRISEFALL3METHODS_INDICATOR_NAME: string = "CDLRISEFALL3METHODS";

export class CDLRISEFALL3METHODS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLRISEFALL3METHODS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
