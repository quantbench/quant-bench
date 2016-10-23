import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ATR_INDICATOR_NAME: string = "ATR";

export class ATR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ATR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
