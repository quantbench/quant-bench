import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const DX_INDICATOR_NAME: string = "DX";

export class DX
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(DX_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
