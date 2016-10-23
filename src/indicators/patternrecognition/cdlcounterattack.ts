import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLCOUNTERATTACK_INDICATOR_NAME: string = "CDLCOUNTERATTACK";

export class CDLCOUNTERATTACK
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLCOUNTERATTACK_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
