import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LOG10_INDICATOR_NAME: string = "LOG10";

export class LOG10
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LOG10_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
