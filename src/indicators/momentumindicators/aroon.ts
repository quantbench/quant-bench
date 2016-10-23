import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const AROON_INDICATOR_NAME: string = "AROON";

export class AROON
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(AROON_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
