import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MINUSDI_INDICATOR_NAME: string = "MINUSDI";

export class MINUSDI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MINUSDI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
