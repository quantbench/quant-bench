import { DataResolution } from "../DataResolution";
import { SecurityType } from "../SecurityType";

export interface SecurityManager {
    addSecurity(securityType: SecurityType, symbol: string, market: string, resolution: DataResolution, fillDataForward: boolean): void;
}
