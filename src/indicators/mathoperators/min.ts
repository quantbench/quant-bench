import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MIN_INDICATOR_NAME: string = "MIN";

export class MIN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MIN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
