import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLGAPSIDESIDEWHITE_INDICATOR_NAME: string = "CDLGAPSIDESIDEWHITE";

export class CDLGAPSIDESIDEWHITE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLGAPSIDESIDEWHITE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
