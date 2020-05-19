# oclif-graphql-auth0

Boilerplate for talking to GraphQL servers from the command line.

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install
$ ./bin/run configure
What is your GraphQL endpoint?: https://movie-info.herokuapp.com/v1/graphql
Added https://movie-info.herokuapp.com/v1/graphql endpoint
Authenticate with Auth0? (y/n): y
What is your email?: dane.a.burkland@gmail.com
What is your password?: ********
What is your Auth0 domain?: dev-m01wp346.auth0.com
What is your Auth0 clientId?: WiuLfZViErBjqVP4mHo6dNXkp8100e
What is your Auth0 clientSecret?: *********************************
Authenticated dane.a.burkland@gmail.com
```

<!-- usagestop -->

# Commands

```sh-session
USAGE
  $ talk [COMMAND]

COMMANDS
  auth       Supply Auth0 details
  configure  Supply GraphQL endpoint and Auth0 details
  endpoint   Supply GraphQL endpoint details
  help       Display help for talk
  query      Query some data
```

<!-- commandsstop -->
