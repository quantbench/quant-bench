import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const LINEARREGANGLE_INDICATOR_NAME: string = "LINEARREGANGLE";

export class LINEARREGANGLE
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(LINEARREGANGLE_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
