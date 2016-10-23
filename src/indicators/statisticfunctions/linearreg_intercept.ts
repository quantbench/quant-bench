import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LINEARREGINTERCEPT_INDICATOR_NAME: string = "LINEARREGINTERCEPT";

export class LINEARREGINTERCEPT
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LINEARREGINTERCEPT_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
