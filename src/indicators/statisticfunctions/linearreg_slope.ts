import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LINEARREGSLOPE_INDICATOR_NAME: string = "LINEARREGSLOPE";

export class LINEARREGSLOPE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LINEARREGSLOPE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
