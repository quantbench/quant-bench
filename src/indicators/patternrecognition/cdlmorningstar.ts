import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLMORNINGSTAR_INDICATOR_NAME: string = "CDLMORNINGSTAR";

export class CDLMORNINGSTAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLMORNINGSTAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
