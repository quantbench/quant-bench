import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLSEPARATINGLINES_INDICATOR_NAME: string = "CDLSEPARATINGLINES";

export class CDLSEPARATINGLINES
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLSEPARATINGLINES_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
