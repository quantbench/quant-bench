import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SAR_INDICATOR_NAME: string = "SAR";

export class SAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
