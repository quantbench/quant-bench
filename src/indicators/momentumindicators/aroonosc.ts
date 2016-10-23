import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const AROONOSC_INDICATOR_NAME: string = "AROONOSC";

export class AROONOSC
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(AROONOSC_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
