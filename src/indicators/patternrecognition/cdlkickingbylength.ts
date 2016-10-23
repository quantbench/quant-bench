import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLKICKINGBYLENGTH_INDICATOR_NAME: string = "CDLKICKINGBYLENGTH";

export class CDLKICKINGBYLENGTH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLKICKINGBYLENGTH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
