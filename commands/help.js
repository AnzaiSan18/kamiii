const Discord = require("discord.js");

exports.run = async (bot, message, args, tools, con) => {

message.channel.send({embed: {
      color: 3447003,
      title: "Test:",
      fields: [
        { name: "Actions/Roleplay", value: `${bot.commands.filter(cmd => cmd.config.category === 'actions').map(cmd => `\`${cmd.config.name}\``).join(", ")}`, inline: true},
        { name: "Random", value: `${bot.commands.filter(cmd => cmd.config.category === 'random').map(cmd => `\`${cmd.config.name}\``).join(", ")}`, inline: true},
        { name: "Admin", value: `${bot.commands.filter(cmd => cmd.config.category === 'admin').map(cmd => `\`${cmd.config.name}\``).join(", ")}`,},
        { name: "Utility", value: `${bot.commands.filter(cmd => cmd.config.category === 'util').map(cmd => `\`${cmd.config.name}\``).join(", ")}`},
        { name: "NSFW", value: `${bot.commands.filter(cmd => cmd.config.category === 'NSFW').map(cmd => `\`${cmd.config.name}\``).join(", ")}`},
        { name: "Hentai", value: `${bot.commands.filter(cmd => cmd.config.category === 'hentai').map(cmd => `\`${cmd.config.name}\``).join(", ")}`},
        { name: "Owner", value: `${bot.commands.filter(cmd => cmd.config.category === 'owner').map(cmd => `\`${cmd.config.name}\``).join(", ")}`}
      ]
    }
  });
}

module.exports.config = {
  name: "help",
  category: "util",
  description: "help",
  usage: "help",
  aliases: ["helpme", "support"]
};