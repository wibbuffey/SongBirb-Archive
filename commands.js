const fs = require("fs");

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

const message = global.message;
const config = global.config;
const prefix = global.prefix
const volume = global.volume;
const tracklist = global.

    global.volume = volume;
    global.tracklist = tracklist;
    global.message = message;
    global.config = config;

module.exports = {
  "fav": () => {
    song = config.csongs[message.guild.id.toString()]
    if (config.usrfav[song]) {
      if (!config.usrfav[song].includes(message.author.id)) {
        config.usrfav[song].push(message.author.id);
        message.channel.send("Successfully favorited.");
      } else {
        config.usrfav[song].remove(message.author.id);
        message.channel.send("Successfully unfavorited.");
      }
    } else {
      config.usrfav[song] = [message.author.id];
      message.channel.send("Successfully favorited.");
    }
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
  },
  "help": () => {
    message.channel.send(
      fs.readFileSync("help.txt")
      .replace("{{prefix}}", prefix)
    )
  },
  "ping": () => {
    message.channel.send("Pong!");
  },
}
