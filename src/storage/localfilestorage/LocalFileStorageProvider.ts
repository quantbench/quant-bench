import * as fs from "fs";
import * as homedir from "homedir";
import * as yaml from "js-yaml";
import * as path from "path";
import * as util from "util";
import { StorageProvider } from "../StorageProvider";
import { LocalFileStorageOptions } from "./LocalFileStorageOptions";

export class LocalFileStorageProvider implements StorageProvider {

  static CONFIG_DIR_NAME: string = ".quantbench";
  static CONFIG_FILE_NAME: string = "quantbench.yml";

  options: LocalFileStorageOptions;
  async initialise(options: { [name: string]: any }): Promise<void> {

    // extract the options
    this.options = {
      "dataDirectory": path.resolve(options.dataDirectory),
    };

    // check if there is a config dir in the homedir
    const configPath = path.join(homedir(), LocalFileStorageProvider.CONFIG_DIR_NAME);
    const configFile = path.join(configPath, LocalFileStorageProvider.CONFIG_FILE_NAME);
    const stat = util.promisify(fs.stat);
    const mkdir = util.promisify(fs.mkdir);
    const writeFile = util.promisify(fs.writeFile);
    let configPathStats: fs.Stats;
    let configFileStats: fs.Stats;

    try {
      configPathStats = await stat(configPath);
      if (!this.configDirectoryExists(configPathStats)) {
        await mkdir(configPath);
      }
    } catch (error) {
      await mkdir(configPath);
    }

    try {
      configFileStats = await stat(configFile);
      if (!this.configFileExists(configFileStats)) {
        writeFile(configFile, yaml.dump(this.options), { "encoding": "utf8" });
      }
    } catch (error) {
      writeFile(configFile, yaml.dump(this.options), { "encoding": "utf8" });
    }
  }

  private configDirectoryExists(stats: fs.Stats): boolean {
    return stats.isDirectory();
  }

  private configFileExists(stats: fs.Stats): boolean {
    return stats.isFile();
  }
}
