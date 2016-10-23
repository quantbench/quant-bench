import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MAX_INDICATOR_NAME: string = "MAX";

export class MAX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MAX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
