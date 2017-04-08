import { SecurityManager } from "./securities/SecurityManager";

export interface Algorithm {
    initialise(securityManager: SecurityManager): void;
}
