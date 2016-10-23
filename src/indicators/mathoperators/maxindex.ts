import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MAXINDEX_INDICATOR_NAME: string = "MAXINDEX";

export class MAXINDEX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MAXINDEX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
