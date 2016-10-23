import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LINEARREG_INDICATOR_NAME: string = "LINEARREG";

export class LINEARREG
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LINEARREG_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
