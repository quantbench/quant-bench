import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLXSIDEGAP3METHODS_INDICATOR_NAME: string = "CDLXSIDEGAP3METHODS";

export class CDLXSIDEGAP3METHODS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLXSIDEGAP3METHODS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
