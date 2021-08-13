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
    message.channel.send(`
SongBirb, made by <@!544169448890826757>, <@!495942812542697472> and <@!538557982955536410>
Current prefix: ${prefix}
\`\`\`
${prefix}help      -- Display this message.
${prefix}leave     -- Leave the voice chat.
${prefix}summon    -- Summon SongBirb to your VC.
${prefix}ping      -- Check if the bot is up.
${prefix}prefix    -- Change or check the prefix of the server.
${prefix}volume    -- Change the volume of the bot.
${prefix}tracklist -- Change the tracklist the bot uses.\
    \`\`\``);
  },
  "ping": () => {
    message.channel.send("Pong!");
  }
}
