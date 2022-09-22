import dotenv from "dotenv";
dotenv.config()
import {Client, codeBlock,bold, italic, GatewayIntentBits} from "discord.js";

const HELP_MSG = "\nYou can use RollBot by typing \n/roll\t\t\t  (rolls 1-100)\n/roll 103\t\t  (rolls 1-103)\n/roll 3-300\t\t(rolls specified range).\nMinimum is 1 and maximum is 1000000, like in-game."

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.login(process.env.DISCORD_TOKEN);

function roll(start=1,end=100){
    // console.log(start, end);
    return Math.floor(Math.random()*((end+1)-start) + start) //add 1 to end to do include value of end into roll
    //e.g. 0.7*((66+1)-33) + 33 ==> 0.7*(67-33) + 33 ==> 0.7*34 + 33 ==> 23.8 + 33 ==> 56.8 ==> 56 floored. (56 <= 66, 56 >= 33)
}

client.on("messageCreate", async(message) => {
    if(!message?.author.bot) {
        if(message.content.includes("/roll")){
            const msgSplice = message.content.split(" ");
            if(msgSplice[0] == "/roll"){ //if /roll is first in message string, then check if there are trailing arguments
                if(msgSplice.length == 1){ //no args present, user used basic /roll, just return output of default roll();
                    let rolled = roll();
                    message.channel.send(italic(`${message.author} rolled ${rolled} (${1}-${100})`));
                }else if(msgSplice.length == 2){//args present, user most likely specified roll range, perform validity checks of arguments
                    if (msgSplice[1] === "help"){
                        message.channel.send(codeBlock(`${HELP_MSG}`))
                    } else {
                        const rollSplit = msgSplice[1].split("-"); //split the arguments after /roll command
                        // console.log(rollSplit);
                        if(rollSplit.length == 2){//two params specified, check if nums
                            // console.log("length 2")
                            const [start, end] = [parseInt(rollSplit[0]),parseInt(rollSplit[1])]; //cast to int
                            if(typeof(start) === typeof(end) && !isNaN(start) && !isNaN(end)){ //check both are of type: number
                                let startArg = start < 1 ? 1 : start; //if user sets lownumber to lower than 1, set it to 1
                                let endArg = end > 1000000 ? 1000000 : end;
                                if(end >= startArg){ //continue only if end is greater or equal to start
                                    let rolled = roll(startArg,endArg);
                                    message.channel.send(italic(`${message.author} rolled ${rolled} (${startArg}-${endArg})`));
                                }//do nothing if not above criteria
                            }
                        }else if (rollSplit.length == 1){ //only one param specified, check if num
                            let end = parseInt(rollSplit[0]);
                            if(typeof(end) === "number" && !isNaN(end)){
                                let endArg = end > 1000000 ? 1000000 : end;
                                let rolled = roll(undefined,endArg); //pass undefined as first param to use default value in func
                                message.channel.send(italic(`${message.author} rolled ${rolled} (${1}-${endArg})`));
                            }
                        }//if rollsplit len is greater than 2, something went wrong, do nothing
                }
            } //if the above two conditions aren't met, then user specified unknown arguments, do nothing.
            }
        }
    }
})