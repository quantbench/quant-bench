import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLHIGHWAVE_INDICATOR_NAME: string = "CDLHIGHWAVE";

export class CDLHIGHWAVE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLHIGHWAVE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
