import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLLADDERBOTTOM_INDICATOR_NAME: string = "CDLLADDERBOTTOM";

export class CDLLADDERBOTTOM
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLLADDERBOTTOM_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
