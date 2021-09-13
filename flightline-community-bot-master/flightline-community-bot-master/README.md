# Flightline Community Bot                     

[![Discord Members Online](https://discordapp.com/api/guilds/593830690777333770/embed.png)](https://discord.gg/RdS8BRA)

This repository hosts the code for the discord bot that is used by the Flightline Community.
This code, as of v3.3.4 includes:

- ATIS System that can be created by an ATC with the appropriate role.
- Holdqueue system that can be used by ATCs.
- ATC Login system which includes ATC Hour Count.
- Other minor commands that display additional information to the population of the server.

# Table of contents

- [Change Log](https://github.com/supraaxdd/flightline-community-bot/#change-log)
- [Installation and setup](https://github.com/supraaxdd/flightline-community-bot/#installation-and-setup)
- [Support](https://github.com/supraaxdd/flightline-community-bot/#support)
- [Contributing](https://github.com/supraaxdd/flightline-community-bot/#contributing)
- [Acknowledgements](https://github.com/supraaxdd/flightline-community-bot/#acknowledgements)

## Change Log

This log will contain the updates that have been done to the most recent version.

v3.3.4

- [/cmds/atcstats](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/atcstats.js) - Changed conversion from days to Hours and minutes.
- [/cmds/atcstatsid](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/atcstatsid.js) - Changed conversion from days to Hours and minutes.
- [/cmds/login.js](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/login.js) 
    - Fixed bug where user could bypass permission check if they had no ATC roles.
    - Added if clause to prevent users logging in with JKDX. Will be removed when airport will be released in game.
- [/cmds/logout.js](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/logout.js)
    - Changed conversion from days to Hours and minutes.
    - On Duty role removed when logging out.
    - Everything is sent as one message instead of two during logout. ("Logout successful...")

- Added new commands:
    - [/cmds/slowmode.js](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/slowmode.js)
    - [/cmds/roleMembers.js](https://github.com/supraaxdd/flightline-community-bot/blob/master/cmds/roleMembers.js)

## Installation and setup

The setup is quite easy to do.
First make sure you have [Node.js](https://nodejs.org/en/) (v12.X.X+) installed, which should come with the package manager "npm" by default.

Alongside that, make sure that you have a [PostgreSQL server](https://www.postgresql.org/) up and running. This repo will include a database setup file that will enable you to replicate the exact database structure as the main bot is using.

1. Firstly, make sure that you have an empty database that you can use for the bot. Skip this step if already complete.
2. Next, if you are on Windows, open your command line and navigate to the directory where psql is located and execute the following  command: `psql -d newdbname -f \location\of\flightline-community-bot-master\dbsetup.sql`

If you are on a linux based OS, simply run the above command.
   
Right after the Postgres Server is setup, install all of the node dependancies that are required for the bot to run.
Simply execute the following command inside of the project folder in your command line:

```bash
npm install
```

This will install all of the dependancies that are needed in order for the bot to work. The full list can be found in the package.json file. **The bot should be running on discord.js v12+ and Node.js v12.X.X+**

The last step is to fill in the information in the config.json.

If everything was done correctly and you execute:
```bash
node . (OR: node index.js)
```

The following should show up in your Command line:

```

--------------------------------------------------------------------------------------------
Loading x commands:

All commands that were loaded.
--------------------------------------------------------------------------------------------
Loading x custom commands:

All commands that were loaded.
--------------------------------------------------------------------------------------------
Connecting to database: [Database Name]
Connecting as: [Username]
Connecting to [Usually localhost:[port]]
Connected to Database...
--------------------------------------------------------------------------------------------
Bot is ready! Logged in as: [Bot Username]
Logged in on: [Bot Token]
Time Logged on: [Time Logged on using local machine time]
The prefix is: [Prefix]
Below find the invite link should it be needed for the bot to be invited to another server:
[Link Generated]
--------------------------------------------------------------------------------------------
```


## Support

If you need help with anything, you should preferably contact JusSupra#6561 on discord or join the server by pressing on the small Discord image located just below the title. If that is not possible, feel free to open a new issue. Note that if the issue is invalid, it may be closed.

## Contributing

1. Feel free to Fork & Clone the repository and make sure that it is on the __master branch__ as that branch is the most up to date one and the most stable.
2. Run `npm install` in the project folder.
3. Make the changes that you want to propose and code whatever you want!
4. Make sure that everything is good shape and then feel free to create a [Pull Request](https://github.com/supraaxdd/flightline-community-bot/compare) which will be reviewed.

## Acknowledgements

Main Contributor: supraaxdd

Other Contributors which helped along the way:
- ADragonDood
- AircraftAnorak

## Licensing	

ISC License	

Copyright (c) 2020, supraaxdd	

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above	copyright notice and this permission notice appear in all copies.	

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF	MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR	ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
