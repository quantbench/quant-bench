import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTTRENDMODE_INDICATOR_NAME: string = "HTTRENDMODE";

export class HTTRENDMODE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTTRENDMODE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
