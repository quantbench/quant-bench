import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const STDDEV_INDICATOR_NAME: string = "STDDEV";

export class STDDEV
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(STDDEV_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
