import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDL3LINESTRIKE_INDICATOR_NAME: string = "CDL3LINESTRIKE";

export class CDL3LINESTRIKE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDL3LINESTRIKE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
