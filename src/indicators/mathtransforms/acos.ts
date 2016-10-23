import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const ACOS_INDICATOR_NAME: string = "ACOS";

export class ACOS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(ACOS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
