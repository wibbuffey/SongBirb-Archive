const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");

const ping = require("./commands/ping");
const summon = require("./commands/summon");
const leave = require("./commands/leave");
const prefix = require("./commands/prefix");
const help = require("./commands/help");

const check = (prefix) => {
  if (!prefix) {
    return config.prefix.default;
  } else {
    return prefix;
  }
};

const getVolume = (message) => {
  volume = config.volume.custom[message.guild.id.toString()]
  if (customVolume) {
    return customVolume;
  } else {
    return config.volume.default;
  }
}

const getTracklist = (message) => {
  tracklist = config.tracks.custom[message.guild.id.toString()]
  if (customTracklist) {
    return customTracklist;
  } else {
    return config.tracks.default;
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

try {
  client.on("message", (message) => {
    const prefix = check(config.prefix.custom[message.guild.id]);
    const currentVolume = getVolume(message);
    const currentTracklist = getTracklist(message);
    
    if (message.content.startsWith(prefix + "ping")) {
      ping(message);
    } else if (message.content.startsWith(prefix + "summon")) {
      summon(message, client, currentVolume, currentTracklist);
    } else if (message.content.startsWith(prefix + "leave")) {
      leave(message);
    } else if (message.content.startsWith(prefix + "help")) {
      help(message, prefix);
    } else if (message.content.startsWith(prefix + "prefix")) {
      prefix(message, prefix);
    } else if (message.content.startsWith(prefix + "volume")) {
      volume(message, currentVolume);
    } else if (message.content.startsWith(prefix + "tracklist")) {
      tracklist(message, currentTracklist);
    } else if (message.content.startsWith(prefix)) {
      message.channel.send("Command not found. :(");
    }
  });
} catch {
  console.log("Not enough permissions!");
}

client.login(config.logins.token);
