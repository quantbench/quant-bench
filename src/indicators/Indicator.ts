export interface IIndicator<TInputType> {
  name: string;
  description: string;
  isReady: boolean;

  readonly lookback: number;
}

export interface INumericDataIndicator extends IIndicator<number> {
  readonly currentValue: number;

  receiveData(inputData: number): boolean;
}
