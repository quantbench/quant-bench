import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MINMAXINDEX_INDICATOR_NAME: string = "MINMAXINDEX";

export class MINMAXINDEX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MINMAXINDEX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
