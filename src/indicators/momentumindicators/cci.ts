import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CCI_INDICATOR_NAME: string = "CCI";

export class CCI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CCI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
