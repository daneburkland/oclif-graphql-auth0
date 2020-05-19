import { Command, flags } from "@oclif/command";
import { GraphQLClient } from "graphql-request";
import * as fs from "fs-extra";
import * as path from "path";

export default class Query extends Command {
  static description = "Query some data";

  static flags = {
    title: flags.string({ char: "t", description: "title to query" }),
  };

  async run() {
    const config = path.join(this.config.configDir, "config.json");
    const { access_token, endpoint } = await fs.readJSON(config);

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    const query = /* GraphQL */ `
      query getMovie($title: String!) {
        Movie(title: $title) {
          releaseDate
          actors {
            name
          }
        }
      }
    `;
    const { flags } = this.parse(Query);

    const title = flags.title ?? "The Big Lebowski";

    const variables = {
      title,
    };

    const data = await graphQLClient.request(query, variables);
    this.log(`Movie details: ${JSON.stringify(data)}`);
  }
}
