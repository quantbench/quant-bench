export interface IIndicator<TInputType, TOutputType> {
    name: string;
    description: string;
    isReady: boolean;

    readonly currentValue: TOutputType;
    readonly lookback: number;

    receiveData(inputData: TInputType): boolean;
}
