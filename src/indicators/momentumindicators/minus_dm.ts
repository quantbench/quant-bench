import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MINUSDM_INDICATOR_NAME: string = "MINUSDM";

export class MINUSDM
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MINUSDM_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
