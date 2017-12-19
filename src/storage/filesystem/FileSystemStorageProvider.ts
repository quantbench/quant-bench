import { StorageProvider } from "../StorageProvider";
import { FileSystemStorageOptions } from "./FileSystemStorageOptions";
import { FileSystemStorageUtils} from "./FileSystemStorageUtils";

export class LocalFileStorageProvider implements StorageProvider {

  options: FileSystemStorageOptions;
  async initialise(options: { [name: string]: any }): Promise<void> {

    // extract the options
    this.options = {
      "location": options.location,
    };
  }
}
