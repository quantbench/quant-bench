import {IIndicator} from "./indicator";

export abstract class AbstractIndicator<TInputType, TOutputType> implements IIndicator<TInputType, TOutputType> {
    public readonly name: string;
    protected currentValueInternal: TOutputType;
    protected isReadyInternal: boolean;

    constructor(name: string) {
        this.name = name;
    }

    get currentValue(): TOutputType {
        return this.currentValueInternal;
    }

    get isReady(): boolean {
        return this.isReadyInternal;
    }

    abstract receiveData(inputData: TInputType): boolean;
}
