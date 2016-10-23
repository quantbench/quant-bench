import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const TRIMA_INDICATOR_NAME: string = "TRIMA";

export class TRIMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(TRIMA_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
