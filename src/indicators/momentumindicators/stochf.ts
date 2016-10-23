import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const STOCHF_INDICATOR_NAME: string = "STOCHF";

export class STOCHF
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(STOCHF_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
