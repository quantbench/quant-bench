import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDL3WHITESOLDIERS_INDICATOR_NAME: string = "CDL3WHITESOLDIERS";

export class CDL3WHITESOLDIERS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDL3WHITESOLDIERS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
