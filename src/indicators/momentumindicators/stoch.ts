import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const STOCH_INDICATOR_NAME: string = "STOCH";

export class STOCH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(STOCH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
