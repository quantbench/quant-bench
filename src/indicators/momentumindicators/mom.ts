import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const MOM_INDICATOR_NAME: string = "MOM";

export class MOM
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(MOM_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
