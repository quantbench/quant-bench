import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLHOMINGPIGEON_INDICATOR_NAME: string = "CDLHOMINGPIGEON";

export class CDLHOMINGPIGEON
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLHOMINGPIGEON_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
