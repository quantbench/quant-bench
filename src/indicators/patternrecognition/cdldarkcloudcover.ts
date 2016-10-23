import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLDARKCLOUDCOVER_INDICATOR_NAME: string = "CDLDARKCLOUDCOVER";

export class CDLDARKCLOUDCOVER
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLDARKCLOUDCOVER_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
