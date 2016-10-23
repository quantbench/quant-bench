import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SAREXT_INDICATOR_NAME: string = "SAREXT";

export class SAREXT
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SAREXT_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
