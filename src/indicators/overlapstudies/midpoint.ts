import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MIDPOINT_INDICATOR_NAME: string = "MIDPOINT";

export class MIDPOINT
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MIDPOINT_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
