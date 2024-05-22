# Command Line Utility for Open Source Cloud

CLI for working and scripting with [Open Source Cloud](www.osaas.io)

Prerequisites:

- Node >18
- An Open Source Cloud account and a Personal Access Token at hand

## Install

```
npm install -g @osaas/cli
```

## Usage

```
% osc
Usage: osc [options] [command]

Options:
  --env <environment>  Environment to use
  -h, --help           display help for command

Commands:
  admin
  list <serviceId>     List all my service instances
  help [command]       display help for command
```

To display help for subcommand `admin` you enter

```
% osc help admin
Usage: osc [options] [command]

Options:
  --env <environment>  Environment to use
  -h, --help           display help for command

Commands:
  admin
  help [command]       display help for command
birme@Jonas-work-Pink-Air cli % osc help admin
Usage: osc admin [options] [command]

Options:
  -h, --help                             display help for command

Commands:
  gen-pat <tenantId> <username>          Generate a personal access token
  list-instances <tenantId> <serviceId>  List all instances for a service and tenant
  help [command]                         display help for command
```

## Examples

### List all my channel-engine instances

```
% export OSC_ACCESS_TOKEN=<pat>
% osc list channel-engine
```

### List all channel-engine instance for tenant `eyevinn` as an OSC super admin

```
PAT_SECRET=<pat-secret> osc admin list-instances eyevinn channel-engine
```
