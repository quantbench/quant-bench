import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MAMA_INDICATOR_NAME: string = "MAMA";

export class MAMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MAMA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
