import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLSTALLEDPATTERN_INDICATOR_NAME: string = "CDLSTALLEDPATTERN";

export class CDLSTALLEDPATTERN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLSTALLEDPATTERN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
