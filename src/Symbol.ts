import { SecurityIdentifier } from "./SecurityIdentifier";

export class Symbol {
    private identifier: SecurityIdentifier;

    public constructor(identifier: SecurityIdentifier) {
        this.identifier = identifier;
    }

    public get ticker(): string { return this.identifier.name; }
}
