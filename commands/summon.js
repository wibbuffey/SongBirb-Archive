const fs = require("fs");
const ytdl = require("ytdl-core");
const config = require("../config");
const { getInfo } = require("ytdl-getinfo");
const fav = require("./fav");

function play(connection, message, client, volume, tracklist) {
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
          play(connection, message, client, volume, tracklist);
        });
      }
    }
  });
}

module.exports = (message, client, volume, tracklist) => {
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
        play(connection, message, client, volume, tracklist);
        message.channel.send("I've joined your VC.");
      });
    }
  }
};
