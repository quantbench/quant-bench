import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const STOCHRSI_INDICATOR_NAME: string = "STOCHRSI";

export class STOCHRSI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(STOCHRSI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
