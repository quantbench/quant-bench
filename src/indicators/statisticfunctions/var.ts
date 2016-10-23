import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const VAR_INDICATOR_NAME: string = "VAR";

export class VAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(VAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
