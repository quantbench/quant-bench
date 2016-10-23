import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLRICKSHAWMAN_INDICATOR_NAME: string = "CDLRICKSHAWMAN";

export class CDLRICKSHAWMAN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLRICKSHAWMAN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
