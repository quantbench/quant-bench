import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const PLUSDI_INDICATOR_NAME: string = "PLUSDI";

export class PLUSDI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(PLUSDI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
