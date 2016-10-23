import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLDRAGONFLYDOJI_INDICATOR_NAME: string = "CDLDRAGONFLYDOJI";

export class CDLDRAGONFLYDOJI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLDRAGONFLYDOJI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
