import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ROC_INDICATOR_NAME: string = "ROC";

export class ROC
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ROC_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
