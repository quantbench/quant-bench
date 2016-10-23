import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ACCBANDS_INDICATOR_NAME: string = "ACCBANDS";

export class ACCBANDS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ACCBANDS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
