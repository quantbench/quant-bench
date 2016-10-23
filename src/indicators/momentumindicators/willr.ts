import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const WILLR_INDICATOR_NAME: string = "WILLR";

export class WILLR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(WILLR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
