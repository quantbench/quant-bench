import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLGRAVESTONEDOJI_INDICATOR_NAME: string = "CDLGRAVESTONEDOJI";

export class CDLGRAVESTONEDOJI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLGRAVESTONEDOJI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
