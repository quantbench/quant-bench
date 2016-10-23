import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LN_INDICATOR_NAME: string = "LN";

export class LN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
