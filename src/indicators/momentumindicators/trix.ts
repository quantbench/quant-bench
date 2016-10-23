import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TRIX_INDICATOR_NAME: string = "TRIX";

export class TRIX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TRIX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
