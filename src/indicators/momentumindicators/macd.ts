import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MACD_INDICATOR_NAME: string = "MACD";

export class MACD
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MACD_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
