import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MININDEX_INDICATOR_NAME: string = "MININDEX";

export class MININDEX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MININDEX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
