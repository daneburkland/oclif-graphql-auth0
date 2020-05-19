import { Command } from "@oclif/command";
import * as fs from "fs-extra";
import * as path from "path";
import cli from "cli-ux";

export default class ConfigureEndpoint extends Command {
  static description = "Supply GraphQL endpoint details";

  async update() {
    const configFile = path.join(this.config.configDir, "config.json");
    const config = await fs.readJSON(configFile);
    const endpoint = await cli.prompt("What is your GraphQL endpoint?");

    try {
      await fs.outputJSON(configFile, { ...config, endpoint });
      this.log(`Added ${endpoint} endpoint`);
    } catch (e) {
      this.log(e);
    }
  }

  async run() {
    const configFile = path.join(this.config.configDir, "config.json");

    const config = await fs.readJSON(configFile);

    if (config.endpoint) {
      this.log(`Already configured endpoint: ${config.endpoint}`);
      const willUpdate = await cli.confirm("Update endpoint? (y/n)");
      if (willUpdate) {
        await this.update();
      }
    } else {
      await this.update();
    }
  }
}
