const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const botconfig = require("./botconfig.json")
const Discord = require("discord.js");
const weather = require("weather-js");
const superagent = require("superagent");
const urban = require("relevant-urban");
const moment = require("moment");
const fs = require("fs");
const ms = require("ms");
const Jimp = require("jimp")
const ownerID = "374245145329139712";
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCbOcB5Mv31y3LogBrCJvdn-Vynb3_M4nM');
const queue = new Map();
const talkedRecently = new Set();
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const xp = require("./xp.json")

const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

var servers = {};
        const DBL = require("dblapi.js");
        let dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5NzExMTM4ODUwMjc1MzI5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1NjI4MjUwfQ.WaVnrHz6GScfkcrF25K0Y3L0Fs3r9iVUL_KrZRz2uBk', bot);
        dbl.on('posted', () => {
            console.log('Server count posted!');
        })

        dbl.on('error', e => {
            console.log(`Oops! ${e}`);
        }) 


fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    console.log(`Loading ${jsfile.length} commands`);

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

function changing_status() {
	setInterval(async () => {
		const statuslist = [
		  `k>help| ${bot.guilds.size} guilds`,
		  `k>help| ${bot.channels.size} channels`,
		  `k>help| ${bot.users.size} users`,
		  `k>help| With Boobs`,
		  `k>help| Your wife\'s ass`,
		  `k>help| Death is imminent`
		];
		const random = Math.floor(Math.random() * statuslist.length);
	
		try {
		  await bot.user.setPresence({
			game: {
			  name: `${statuslist[random]}`,
			  type: "PLAYING"
			},
			status: "online"
		  });
		} catch (error) {
		  console.error(error);
		}
	  }, 10000);
	}

bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`)
    setInterval(changing_status, 15000);
});


bot.on("message", async message => {
    if (message.author.bot) return;

   let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if (talkedRecently.has(message.author.id)) return;
   else {

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("RANDOM")
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 15000);
    })}

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

    let msg = message.content.toUpperCase();
	  let sender = message.author;
	  if (message.channel.type === "dm") {
        let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setTitle("Direct Message To The Bot")
            .addField(`Sent By:`, sender)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL)
            .addField(`Message: `, message.content)
            .setFooter(`DM Bot Messages | DM Logs`)
        bot.users.get("330985766668992512").send(embed)
    }

bot.on('guildMemberAdd', async member => {
const channel = member.guild.channels.find(ch => ch.name === 'welcome-logs');

  let logEmbed = new Discord.RichEmbed()
  .setAuthor("Logs") 
  .setDescription('Welcome to the server, ${member}!')
  .setFooter("Welcome~", member.user.displayAvatarURL)
  .setColor('RANDOM')
  .setTimestamp()
  channel.send(logEmbed);
})

bot.on('guildMemberRemove', async member => {
const channel = member.guild.channels.find(ch => ch.name === 'leave-logs');

  let logEmbed = new Discord.RichEmbed()
  .setAuthor("Logs") 
  .setDescription(member.user.username + " has left the server(ID: " + member.user.id + ")")
  .setFooter("Goodbye~", member.user.displayAvatarURL)
  .setColor('RANDOM')
  .setTimestamp()
  channel.send(logEmbed);
})

bot.on('guildBanAdd', (guild, user) => {
	const logschannel = guild.channels.find(ch => ch.name === 'mod-logs');
	return logschannel.send(`${user.username} was just banned!`);
});

bot.on('guildBanRemove', (guild, user) => {
	const logschannel = guild.channels.find(ch => ch.name === 'mod-logs');
	return logschannel.send(`${user.username} was just unbanned!`);
});

bot.on("channelCreate", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'mod-logs');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("Channel Created")
		.setColor("RANDOM")
		.setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
		.setTimestamp(new Date());
	logs.send(cembed)
});

bot.on("channelCreate", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'mod-logs');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("Channel Created")
		.setColor("RANDOM")
		.setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
		.setTimestamp(new Date());
	logs.send(cembed)
});

bot.on("channelDelete", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'mod-logs');
	if (!logs) return console.log("Can't find logs channel.");
	const cembed = new Discord.RichEmbed()
		.setTitle("Channel Deleted")
		.setColor("RANDOM")
		.setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
		.setTimestamp(new Date())
	logs.send(cembed)
});

 bot.on("guildDelete", guild => {
    const liveLeave = bot.channels.get("527350215062323213"); //CHANGE TO YOUR CHANNEL-ID TO GET NOTIFICATIONS
    let liveLEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Your Bot Has Stopped Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    liveLeave.send(liveLEmbed)
 });
})



bot.login(botconfig.token)