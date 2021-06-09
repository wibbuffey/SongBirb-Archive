const fs = require("fs");
const config = require("../config")

module.exports = (message, prefix) => {
  args = message.content.split(" ");
  if (args.length < 2) {
    message.channel.send(`Current prefix: ${prefix}`);
  } else if (args.length > 2) {
    message.channel.send("Too many parameters!");
  } else {
    let newPrefix = args[1];
    config.prefix.custom[message.guild.id.toString()] = newPrefix;
    fs.writeFile("config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        message.channel.send("An error occurred.");
      } else {
        message.channel.send("Prefix changed.")
      }
    })
  }
};
