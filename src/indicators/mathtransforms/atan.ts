import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ATAN_INDICATOR_NAME: string = "ATAN";

export class ATAN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ATAN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
