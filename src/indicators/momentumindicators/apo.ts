import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const APO_INDICATOR_NAME: string = "APO";

export class APO
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(APO_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
