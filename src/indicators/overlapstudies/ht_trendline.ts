import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTTRENDLINE_INDICATOR_NAME: string = "HTTRENDLINE";

export class HTTRENDLINE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTTRENDLINE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
