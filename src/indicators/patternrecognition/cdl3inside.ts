import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDL3INSIDE_INDICATOR_NAME: string = "CDL3INSIDE";

export class CDL3INSIDE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDL3INSIDE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
