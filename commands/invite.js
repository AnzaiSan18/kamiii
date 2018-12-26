const Discord = require("discord.js")
const superagent = require("superagent");
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
      if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 30 secs before getting typing this again. - " + message.author);
    } else {

message.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Invite the bot ;3",
    description: "[Click me to be redirected.](https://goo.gl/qiuw45)"
}
                     })}}


module.exports.config = {
  name: "invite",
  category: "util",
  description: "invite",
  usage: "invite",
  aliases: ["ADDBOT"]
};