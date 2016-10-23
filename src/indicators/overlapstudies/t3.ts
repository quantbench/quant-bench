import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const T3_INDICATOR_NAME: string = "T3";

export class T3
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(T3_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
