import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLIDENTICAL3CROWS_INDICATOR_NAME: string = "CDLIDENTICAL3CROWS";

export class CDLIDENTICAL3CROWS
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLIDENTICAL3CROWS_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
