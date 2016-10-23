import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MINMAX_INDICATOR_NAME: string = "MINMAX";

export class MINMAX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MINMAX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
