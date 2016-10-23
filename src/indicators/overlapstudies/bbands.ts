import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const BBANDS_INDICATOR_NAME: string = "BBANDS";

export class BBANDS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(BBANDS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
