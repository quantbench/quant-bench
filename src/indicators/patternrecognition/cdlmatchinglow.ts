import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLMATCHINGLOW_INDICATOR_NAME: string = "CDLMATCHINGLOW";

export class CDLMATCHINGLOW
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLMATCHINGLOW_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
