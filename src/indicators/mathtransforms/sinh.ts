import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SINH_INDICATOR_NAME: string = "SINH";

export class SINH
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SINH_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
