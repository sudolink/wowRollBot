# wowRollBot
A discord bot bringing /roll functionality from World of Warcraft to your discord server.
It doesnt full utilize all the functionality that Discord gives to bots (like slash commands), it scans text messages on channels and ignores anything that doesn't start with /roll. In that manner, it is very primitive and perhaps stupidly designed. I think discord allows for /commands to invoke a bot, this doesn't do that. I did this in a couple of hours wanting to quickly write it up, and didn't want to read tons of documentation.

The bot is quite simple and the type checks it does on user inputs aren't very well made, i.e. it will probably break with unintended use.
The game functionality is ported in full though.

commands it responds to:
/roll help      (description like this below)
/roll           (rolls between 1-100)
/roll 33        (rolls between 1-33)
/roll 3-300     (rolls between 3-300)
Minimum is 1 and maximum is 1000000, like in-game.


If you don't know how to set it up, here's a quick walkthrough.

You need somewhere to host the bot 24/7. I used Linode to spin up a Ubuntu server.
You'll need node.js installed.
Clone the repo, navigate to repo root dir and install the required packages (npm install)

Read this => https://discordpy.readthedocs.io/en/stable/discord.html
for how to setup a bot acc on the Discord website.
Put your "DISCORD_TOKEN=<discord bot key here>" in the .env file. If you don't see it, just reset it and get a new one.
in the project root type 'npm start' to run the server or 'npm run dev' to start the server AND rerun the bot anytime you change the code.

On the website you'll also make an invite url which is used to add the bot to a server.
in the OAuth2/URL Generator set scope to Bot, and under Text Permissions tick Send Messages and Read Message History.
The generated URL is at the bottom of the page there.

Use the URL to inv the bot to a server that you're in control of.
Happy rolling!