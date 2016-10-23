import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TEMA_INDICATOR_NAME: string = "TEMA";

export class TEMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TEMA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
