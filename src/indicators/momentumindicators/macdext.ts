import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MACDEXT_INDICATOR_NAME: string = "MACDEXT";

export class MACDEXT
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MACDEXT_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
