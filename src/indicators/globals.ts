export const INVALID_INDICATOR_MIN_TIMEPERIOD = " requires a time period greater than ";

export function generateMinTimePeriodError(indicatorName: string,
    minTimePeriod: number,
    suppliedTimePeriod: number): string {
        return indicatorName + INVALID_INDICATOR_MIN_TIMEPERIOD + minTimePeriod + ". Time period supplied was " + suppliedTimePeriod;
}
