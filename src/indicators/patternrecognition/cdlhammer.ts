import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLHAMMER_INDICATOR_NAME: string = "CDLHAMMER";

export class CDLHAMMER
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLHAMMER_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
