import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLCLOSINGMARUBOZU_INDICATOR_NAME: string = "CDLCLOSINGMARUBOZU";

export class CDLCLOSINGMARUBOZU
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLCLOSINGMARUBOZU_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
