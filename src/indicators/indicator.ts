export interface IIndicator<TInputType, TOutputType> {
    name: string;
    isReady: boolean;

    readonly currentValue: TOutputType;
    readonly lookback: number;

    receiveData(inputData: TInputType): boolean;
}
