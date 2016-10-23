import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const AD_INDICATOR_NAME: string = "AD";

export class AD
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(AD_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
