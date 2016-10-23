import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLLONGLEGGEDDOJI_INDICATOR_NAME: string = "CDLLONGLEGGEDDOJI";

export class CDLLONGLEGGEDDOJI
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLLONGLEGGEDDOJI_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
