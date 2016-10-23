import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SUM_INDICATOR_NAME: string = "SUM";

export class SUM
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SUM_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
