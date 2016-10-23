import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const WMA_INDICATOR_NAME: string = "WMA";

export class WMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(WMA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
