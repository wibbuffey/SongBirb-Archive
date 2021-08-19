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

function play(connection) {
  fs.readFile("./tracks/" + tracklist + ".txt", (err, content) => {
    if (err) {
      console.error(err);
    } else {
      let songs = content.toString().split("\n");
      let index = Math.floor(Math.random() * songs.length);
      let song = songs[index];
      if (song.startsWith("#")) {
        play(connection, message, client, volume, tracklist);
      } else {
        config.csongs[message.guild.id.toString()] = song
        fs.writeFile("config.json", JSON.stringify(config, null, 2), (err) => {
          if (err) {
            message.channel.send("An error occurred.");
          }
        })
        let stream = ytdl(song, { filter: "audioonly" });
        let dispatcher = connection.play(stream, { seek: 0, volume: volume });
        getInfo(song).then((info) => {
          message.channel.send(`Now playing: ${info.items[0].title} (${song})`);
          if (config.usrfav[song]) {
            var msg = "";
            config.usrfav[song].map((value) => {
              msg += `<@!${value}>`;
            });
            if (msg) {
              message.channel.send(msg);
            }
          }
        });
        dispatcher.on("finish", () => {
          play(connection);
        });
      }
    }
  });
}

const message = global.message;
const config = global.config;
const prefix = global.prefix
const volume = global.volume;
const tracklist = global.tracklist;

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
  "summon": () => {
    let channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("You must be in a voice channel to summon me.");
    } else {
      let permissions = channel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        message.channel.send("I need to be able to connect to the VC!");
      } else if (!permissions.has("SPEAK")) {
        message.channel.send("I need to be able to speak in the VC!");
      } else {
        channel.join().then((connection) => {
          play(connection);
          message.channel.send("I've joined your VC.");
        });
      }
    }
  },
  "leave": (message) => {
    try {
      message.member.voice.channel.leave();
      message.channel.send("I left the VC.")
    } catch (e) {
      message.channel.send("You're not in a VC with me.");
    }
  }
}
