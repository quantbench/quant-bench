import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLSHOOTINGSTAR_INDICATOR_NAME: string = "CDLSHOOTINGSTAR";

export class CDLSHOOTINGSTAR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLSHOOTINGSTAR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
