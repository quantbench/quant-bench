import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const BOP_INDICATOR_NAME: string = "BOP";

export class BOP
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(BOP_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
