import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLSPINNINGTOP_INDICATOR_NAME: string = "CDLSPINNINGTOP";

export class CDLSPINNINGTOP
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLSPINNINGTOP_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
