const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config");
const commands = require("./commands");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
  console.log(`Default prefix: ${config.prefix.default}`);
});

try {
  client.on("message", (message) => {
    const prefix = config.prefix.custom[message.guild.id] || config.prefix.default;
    const command = message.split(prefix.length - 1, message.length - 1)
    
    if (message.startsWith("prefix") && commands[command]) {
      commands[command]()
    } else {
      message.channel.send("Command not found!")
    }
  });
} catch {
  console.log("Not enough permissions!");
}

client.login(config.logins.token);
