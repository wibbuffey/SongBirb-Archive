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
  customVolume = config.volume.custom[message.guild.id.toString()];
  if (customVolume) {
    return customVolume;
  } else {
    return config.volume.default;
  }
};

const getTracklist = (message) => {
  customTracklist = config.tracks.custom[message.guild.id.toString()];
  if (customTracklist) {
    return customTracklist;
  } else {
    return config.tracks.default;
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
  console.log(`Default prefix: ${config.prefix.default}`)
});

try {
  client.on("message", (message) => {
    const currentPrefix = check(config.prefix.custom[message.guild.id]);
    const currentVolume = getVolume(message);
    const currentTracklist = getTracklist(message);

    if (message.content.startsWith(currentPrefix + "ping")) {
      ping(message);
    } else if (message.content.startsWith(currentPrefix + "summon")) {
      summon(message, client, currentVolume, currentTracklist);
    } else if (message.content.startsWith(currentPrefix + "leave")) {
      leave(message);
    } else if (message.content.startsWith(currentPrefix + "help")) {
      help(message, currentPrefix);
    } else if (message.content.startsWith(currentPrefix + "prefix")) {
      prefix(message, currentPrefix);
    } else if (message.content.startsWith(currentPrefix + "volume")) {
      volume(message, currentVolume);
    } else if (message.content.startsWith(currentPrefix + "tracklist")) {
      tracklist(message, currentTracklist);
    } else if (message.content.startsWith(currentPrefix)) {
      message.channel.send("Command not found. :(");
    }
  });
} catch {
  console.log("Not enough permissions!");
}

client.login(config.logins.token);
