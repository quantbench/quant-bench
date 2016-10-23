import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const SIN_INDICATOR_NAME: string = "SIN";

export class SIN
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(SIN_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
