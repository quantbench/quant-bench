import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const PLUSDM_INDICATOR_NAME: string = "PLUSDM";

export class PLUSDM
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(PLUSDM_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
