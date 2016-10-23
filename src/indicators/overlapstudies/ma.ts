import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MA_INDICATOR_NAME: string = "MA";

export class MA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
