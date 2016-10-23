import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CMO_INDICATOR_NAME: string = "CMO";

export class CMO
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CMO_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
