import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TSF_INDICATOR_NAME: string = "TSF";

export class TSF
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TSF_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
