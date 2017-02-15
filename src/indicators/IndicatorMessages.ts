export const INVALID_INDICATOR_MIN_TIMEPERIOD = " requires a time period greater than ";
export const INVALID_INDICATOR_MIN_VOLUMEFACTOR = " requires a volume factor greater than ";
export const INVALID_INDICATOR_MAX_VOLUMEFACTOR = " requires a volume factor less than ";
export const INVALID_INDICATOR_MIN_FASTLIMIT = " requires a fast limit greater than ";
export const INVALID_INDICATOR_MAX_FASTLIMIT = " requires a fast limit less than ";
export const INVALID_INDICATOR_MIN_SLOWLIMIT = " requires a slow limit greater than ";
export const INVALID_INDICATOR_MAX_SLOWLIMIT = " requires a slow limit less than ";

export function generateMinTimePeriodError(indicatorName: string,
    minTimePeriod: number,
    suppliedTimePeriod: number): string {
    return indicatorName + INVALID_INDICATOR_MIN_TIMEPERIOD + minTimePeriod + ". Time period supplied was " + suppliedTimePeriod;
}

export function generateMinVolumeFactorError(indicatorName: string,
    minVolumeFactor: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MIN_TIMEPERIOD + minVolumeFactor + ". Volume factor supplied was " + suppliedVolumeFactor;
}

export function generateMaxVolumeFactorError(indicatorName: string,
    maxVolumeFactor: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MAX_VOLUMEFACTOR + maxVolumeFactor + ". Volume factor supplied was " + suppliedVolumeFactor;
}

export function generateMinFastLimitError(indicatorName: string,
    minFastLimit: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MIN_TIMEPERIOD + minFastLimit + ". Fast limit supplied was " + suppliedVolumeFactor;
}

export function generateMaxFastLimitError(indicatorName: string,
    maxFastLimit: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MAX_VOLUMEFACTOR + maxFastLimit + ". Fast limit supplied was " + suppliedVolumeFactor;
}

export function generateMinSlowLimitError(indicatorName: string,
    minSlowLimit: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MIN_TIMEPERIOD + minSlowLimit + ". Slow limit supplied was " + suppliedVolumeFactor;
}

export function generateMaxSlowLimitError(indicatorName: string,
    maxSlowLimit: number,
    suppliedVolumeFactor: number): string {
    return indicatorName + INVALID_INDICATOR_MAX_VOLUMEFACTOR + maxSlowLimit + ". Slow limit supplied was " + suppliedVolumeFactor;
}
