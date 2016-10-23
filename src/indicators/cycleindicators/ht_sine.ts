import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const HTSINE_INDICATOR_NAME: string = "HTSINE";

export class HTSINE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(HTSINE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
