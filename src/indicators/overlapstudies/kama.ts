import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const KAMA_INDICATOR_NAME: string = "KAMA";

export class KAMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(KAMA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
