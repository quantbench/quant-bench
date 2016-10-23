import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ADX_INDICATOR_NAME: string = "ADX";

export class ADX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ADX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
