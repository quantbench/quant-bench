import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ADXR_INDICATOR_NAME: string = "ADXR";

export class ADXR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ADXR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
