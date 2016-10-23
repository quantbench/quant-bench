import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const EXP_INDICATOR_NAME: string = "EXP";

export class EXP
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(EXP_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
