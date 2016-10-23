import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ASIN_INDICATOR_NAME: string = "ASIN";

export class ASIN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ASIN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
