import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDL3STARSINSOUTH_INDICATOR_NAME: string = "CDL3STARSINSOUTH";

export class CDL3STARSINSOUTH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDL3STARSINSOUTH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
