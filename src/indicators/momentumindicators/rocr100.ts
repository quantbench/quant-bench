import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ROCR100_INDICATOR_NAME: string = "ROCR100";

export class ROCR100
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ROCR100_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
