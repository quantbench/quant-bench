import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TAN_INDICATOR_NAME: string = "TAN";

export class TAN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TAN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
