import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLUNIQUE3RIVER_INDICATOR_NAME: string = "CDLUNIQUE3RIVER";

export class CDLUNIQUE3RIVER
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLUNIQUE3RIVER_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
