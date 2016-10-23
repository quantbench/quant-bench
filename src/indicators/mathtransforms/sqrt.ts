import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SQRT_INDICATOR_NAME: string = "SQRT";

export class SQRT
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SQRT_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
