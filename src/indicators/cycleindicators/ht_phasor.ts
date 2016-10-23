import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTPHASOR_INDICATOR_NAME: string = "HTPHASOR";

export class HTPHASOR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTPHASOR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
