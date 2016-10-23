import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLADVANCEBLOCK_INDICATOR_NAME: string = "CDLADVANCEBLOCK";

export class CDLADVANCEBLOCK
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLADVANCEBLOCK_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
