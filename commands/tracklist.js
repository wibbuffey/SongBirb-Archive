const fs = require("fs");
const config = require("../config")

module.exports = (message, tracklist) => {
  args = message.content.split(" ");
  if (args.length < 2) {
    message.channel.send(`Current tracklist: ${tracklist}`);
  } else if (args.length > 2) {
    message.channel.send("Too many parameters!");
  } else {
    if (!fs.existsSync("./tracks/" + tracklist + ".txt")) {
      message.channel.send("The tracklist must exist. Supported lists: pokemon.")
    } else {
      let newTracklist = args[1];
      config.tracks.custom[message.guild.id.toString()] = newTracklist;
      fs.writeFile("config.json", JSON.stringify(config, null, 2), (err) => {
        if (err) {
          message.channel.send("An error occurred.");
        } else {
          message.channel.send("Tracklist changed.")
        }
      })
    }
  }
};
