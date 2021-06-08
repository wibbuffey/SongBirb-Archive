const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");

const ping = require("./commands/ping");
const summon = require("./commands/summon");
const leave = require("./commands/leave");
const help = require("./commands/help");

const check = (prefix) => {
  if (!prefix) {
    return config.prefix.default;
  } else {
    return prefix;
  }
};

const getVolume = (message) => {
  volume = config.volume.custom[message.guild.id
  if (customVolume) {
    return customVolume;
  } else {
    return config.volume.default;
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

try {
  client.on("message", (message) => {
    const prefix = check(config.prefix.custom[message.guild.id]);
    if (message.content.startsWith(prefix + "ping")) {
      ping(message);
    } else if (message.content.startsWith(prefix + "summon")) {
      volume = getVolume(message);
      summon(message, client, volume);
    } else if (message.content.startsWith(prefix + "leave")) {
      leave(message);
    } else if (message.content.startsWith(prefix + "help")) {
      help(message, prefix);
    } else if (message.content.startsWith(prefix + "prefix")) {
      message.channel.send("Prefix is currently not working. :(");
      // prefix(message, prefix);
    } else if (message.content.startsWith(prefix)) {
      message.channel.send("Command not found. :(");
    }
  });
} catch {
  console.log("Not enough permissions!");
}

client.login(config.logins.token);
