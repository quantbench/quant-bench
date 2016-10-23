import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const COS_INDICATOR_NAME: string = "COS";

export class COS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(COS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
