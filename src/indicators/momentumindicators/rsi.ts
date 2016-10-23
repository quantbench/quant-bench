import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const RSI_INDICATOR_NAME: string = "RSI";

export class RSI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(RSI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
