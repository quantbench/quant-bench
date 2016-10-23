import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CEIL_INDICATOR_NAME: string = "CEIL";

export class CEIL
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CEIL_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
