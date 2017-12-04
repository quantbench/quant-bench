export interface StorageProvider {
  initialise(options: { [name: string]: any }): Promise<void>;
}
