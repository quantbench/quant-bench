import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const AVGDEV_INDICATOR_NAME: string = "AVGDEV";

export class AVGDEV
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(AVGDEV_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
