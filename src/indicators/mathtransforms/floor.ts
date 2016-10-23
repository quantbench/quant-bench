import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const FLOOR_INDICATOR_NAME: string = "FLOOR";

export class FLOOR
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(FLOOR_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
