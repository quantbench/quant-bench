import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TRANGE_INDICATOR_NAME: string = "TRANGE";

export class TRANGE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TRANGE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
