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
  if (config.usrfav[global.song]) {
    if (!config.usrfav[global.song].includes(message.author.id)) {
      config.usrfav[global.song].push(message.author.id);
      message.channel.send("Successfully favorited.");
    } else {
      config.usrfav[global.song].remove(message.author.id);
      message.channel.send("Successfully unfavorited.");
    }
  } else {
    config.usrfav[global.song] = [message.author.id];
    message.channel.send("Successfully favorited.");
  }
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
};
