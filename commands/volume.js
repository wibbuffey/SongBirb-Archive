const fs = require("fs");
const config = require("./config")

module.exports = (message, volume) => {
  args = message.content.split(" ");
  if (args.length < 2) {
    message.channel.send(`Current volume: ${volume}`);
  } else if (args.length > 2) {
    message.channel.send("Too many parameters!");
  } else {
    if (volume > 1 || volume <= 0) {
      message.channel.send("The volume must be a number in (0,1].")
    } else {
      let newVolume = args[1];
      config.volume.custom[message.guild.id.toString()] = newVolume;
      fs.writeFile("config.json", JSON.stringify(config, null, 2), () => {
        if (err) {
          message.channel.send("An error occurred.");
        } else {
          message.channel.send("Volume changed.")
        }
      })
    }
  }
};
