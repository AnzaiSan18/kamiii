const Discord = require("discord.js")
const superagent = require("superagent");
const talkedRecently = new Set();
module.exports.run = async (bot, message, args) => {
      if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 30 secs before getting typing this again. - " + message.author);
    } else {
   let whips = [

"https://images.sex.com/images/pinporn/2018/12/14/300/20357362.gif",
"https://images.sex.com/images/pinporn/2018/12/20/300/20390883.gif",
"https://images.sex.com/images/pinporn/2018/12/17/300/20375520.gif",
"https://images.sex.com/images/pinporn/2018/12/17/300/20375581.gif",
"https://images.sex.com/images/pinporn/2018/12/04/300/20303288.gif",
"https://images.sex.com/images/pinporn/2018/12/04/300/20304178.gif",
"https://images.sex.com/images/pinporn/2018/12/20/300/20391891.gif",
"https://images.sex.com/images/pinporn/2018/12/11/300/20345444.gif",
"https://images.sex.com/images/pinporn/2018/11/28/300/20276450.gif",
"https://images.sex.com/images/pinporn/2018/12/06/300/20314024.gif",
"https://images.sex.com/images/pinporn/2018/11/03/300/20167622.gif",
"https://images.sex.com/images/pinporn/2018/12/21/300/20394488.gif",
"https://images.sex.com/images/pinporn/2018/12/10/300/20335707.gif",
"https://images.sex.com/images/pinporn/2018/12/12/300/20346015.gif",
"https://images.sex.com/images/pinporn/2018/12/19/300/20383998.gif",
"https://images.sex.com/images/pinporn/2018/12/18/300/20382558.gif"
];

var whip = message.content.substring(5);

const notwhipembed = new Discord.RichEmbed()
.setTitle("This channel is not marked as NSFW!")
.setColor("#FF69B4");

const spankembed = new Discord.RichEmbed()
.setColor("#FF69B4")
.setDescription(message.author.toString())
.setImage(whips[Math.floor(Math.random() * whips.length)])
message.delete().catch();
if (message.channel.nsfw) message.channel.send(spankembed)
else message.channel.send(notwhipembed)
}

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 10000);
    }

module.exports.config = {
    name: "bondage",
    description: "BDSM",
    usage: "BDSM",
    category: "NSFW",
    aliases: ["BdSmMMMmMmM"]
}