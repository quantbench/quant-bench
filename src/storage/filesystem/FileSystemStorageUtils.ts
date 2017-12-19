import * as fs from "fs";
import * as homedir from "homedir";
import * as yaml from "js-yaml";
import * as path from "path";
import * as util from "util";

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

export class FileSystemStorageUtils {

  static CONFIG_DIR_NAME: string = ".quantbench";
  static CONFIG_FILE_NAME: string = "quantbench.yml";
  static DATAPROVIDERS_FILE_NAME: string = "_dataproviders.yml";
  static MARKETS_FILE_NAME: string = "_markets.yml";
  static SECURITIES_FILE_NAME: string = "_securities.yml";

  async createConfigDirectoryIfRequired() {
    // check if there is a config dir in the homedir
    const configPath = path.join(homedir(), FileSystemStorageUtils.CONFIG_DIR_NAME);
    const configFile = path.join(configPath, FileSystemStorageUtils.CONFIG_FILE_NAME);
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

  async createConfigFileIfRequired() {
    const configPath = path.join(homedir(), FileSystemStorageUtils.CONFIG_DIR_NAME);
    const configFile = path.join(configPath, FileSystemStorageUtils.CONFIG_FILE_NAME);
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
