import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MFI_INDICATOR_NAME: string = "MFI";

export class MFI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MFI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
