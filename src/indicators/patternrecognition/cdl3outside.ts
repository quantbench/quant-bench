import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDL3OUTSIDE_INDICATOR_NAME: string = "CDL3OUTSIDE";

export class CDL3OUTSIDE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDL3OUTSIDE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
