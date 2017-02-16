export interface Indicator<TInputType> {
    name: string;
    description: string;
    isReady: boolean;

    readonly lookback: number;
}

export interface NumericDataIndicator extends Indicator<number> {
    readonly currentValue: number;

    receiveData(inputData: number): boolean;
}
