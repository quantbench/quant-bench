import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TANH_INDICATOR_NAME: string = "TANH";

export class TANH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TANH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
