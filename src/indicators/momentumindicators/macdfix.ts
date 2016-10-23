import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MACDFIX_INDICATOR_NAME: string = "MACDFIX";

export class MACDFIX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MACDFIX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
