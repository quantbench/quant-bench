import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ROCR_INDICATOR_NAME: string = "ROCR";

export class ROCR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ROCR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
