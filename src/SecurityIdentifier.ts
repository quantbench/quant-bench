export class SecurityIdentifier {
    private nameValue: string;

    public constructor(name: string, market: string) {
        this.nameValue = name;
    }
    public get name(): string { return this.nameValue; }
}
