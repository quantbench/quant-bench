import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ROCP_INDICATOR_NAME: string = "ROCP";

export class ROCP
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ROCP_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
