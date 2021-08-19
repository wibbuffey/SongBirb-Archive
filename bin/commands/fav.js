const config = require("../config");
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

module.exports = (message) => {
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
};
