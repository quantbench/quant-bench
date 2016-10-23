import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLCONCEALBABYSWALL_INDICATOR_NAME: string = "CDLCONCEALBABYSWALL";

export class CDLCONCEALBABYSWALL
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLCONCEALBABYSWALL_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
