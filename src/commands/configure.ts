import { Command } from "@oclif/command";
import ConfigureEndpoint from "./endpoint";
import ConfigureAuth from "./auth";
import cli from "cli-ux";

export default class Configure extends Command {
  static description = "Supply GraphQL endpoint and Auth0 details";

  async run() {
    await ConfigureEndpoint.run();

    const willAuthenticate = await cli.confirm(
      "Authenticate with Auth0? (y/n)"
    );
    if (willAuthenticate) {
      await ConfigureAuth.run();
    }
  }
}
