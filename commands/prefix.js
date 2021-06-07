const fs = require("fs");

module.exports = (message, prefix) => {
  args = message.content.split(" ");
  if (args.length < 2) {
    message.channel.send(`Current prefix: ${prefix}`);
  } else if (args.length > 2) {
    message.channel.send("Too many parameters!");
  } else {
    let prefix = args[1];
    message.channel.send("Prefix changed.");
  }
};
