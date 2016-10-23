import {IIndicator} from "./indicator";

export abstract class AbstractIndicator<TInputType, TOutputType> implements IIndicator<TInputType, TOutputType> {
    public readonly name: string;
    private currentValueInternal: TOutputType;
    private isReadyInternal: boolean;
    private lookbackInternal: number;

    constructor(name: string) {
        this.name = name;
        this.lookbackInternal = 0;
    }

    get currentValue(): TOutputType {
        return this.currentValueInternal;
    }

    get isReady(): boolean {
        return this.isReadyInternal;
    }

    get lookback(): number {
        return this.lookbackInternal;
    }

    abstract receiveData(inputData: TInputType): boolean;

    protected setIsReady() {
        this.isReadyInternal = true;
    }

    protected setCurrentValue(newValue: TOutputType) {
        this.currentValueInternal = newValue;
    }

    protected setLookBack(lookback: number) {
        this.lookbackInternal = lookback;
    }
}
