import { Command } from "@oclif/command";
var AuthenticationClient = require("auth0").AuthenticationClient;
import * as fs from "fs-extra";
import * as path from "path";
import cli from "cli-ux";

export default class Auth extends Command {
  static description = "Supply Auth0 details";

  async update() {
    const configFile = path.join(this.config.configDir, "config.json");
    const config = await fs.readJSON(configFile);
    const username = await cli.prompt("What is your email?");
    const password = await cli.prompt("What is your password?", {
      type: "hide",
    });
    const domain = await cli.prompt("What is your Auth0 domain?");
    const clientId = await cli.prompt("What is your Auth0 clientId?");
    const clientSecret = await cli.prompt("What is your Auth0 clientSecret?", {
      type: "hide",
    });

    try {
      var auth0 = new AuthenticationClient({
        domain,
        clientId,
        clientSecret,
      });

      const asd = await auth0.oauth!.passwordGrant({
        username,
        password,
        realm: "Username-Password-Authentication",
      });
      await fs.outputJSON(configFile, {
        ...config,
        access_token: asd.access_token,
      });
      this.log(`Authenticated ${username}`);
    } catch (e) {
      this.log(e);
    }
  }

  async run() {
    const configFile = path.join(this.config.configDir, "config.json");
    const config = await fs.readJSON(configFile);

    if (config.access_token) {
      this.log("Already added authentication details.");
      const willUpdate = await cli.confirm(
        "Update authentication details? (y/n)"
      );
      if (willUpdate) {
        this.update();
      }
    } else {
      this.update();
    }
  }
}
