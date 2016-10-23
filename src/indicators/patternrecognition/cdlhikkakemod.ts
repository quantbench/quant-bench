import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLHIKKAKEMOD_INDICATOR_NAME: string = "CDLHIKKAKEMOD";

export class CDLHIKKAKEMOD
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLHIKKAKEMOD_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
