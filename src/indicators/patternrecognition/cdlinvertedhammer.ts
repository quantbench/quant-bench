import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLINVERTEDHAMMER_INDICATOR_NAME: string = "CDLINVERTEDHAMMER";

export class CDLINVERTEDHAMMER
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLINVERTEDHAMMER_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
