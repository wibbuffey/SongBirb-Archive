const fs = require("fs");
const ytdl = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");

function play(connection, message, client, volume) {
  fs.readFile("./songs.txt", (err, content) => {
    if (err) {
      console.error(err);
    } else {
      let songs = content.toString().split("\n");
      let index = Math.floor(Math.random() * songs.length);
      let song = songs[index];
      if (song.startsWith("#")) {
        play(connection, message, client);
      } else {
        let stream = ytdl(song, { filter: "audioonly" });
        let dispatcher = connection.play(stream, { seek: 0, volume: volume });
        getInfo(song).then((info) => {
          message.channel.send(`Now playing: ${info.items[0].title} (${song})`);
        });
        dispatcher.on("finish", () => {
          play(connection, message, client);
        });
      }
    }
  });
}

module.exports = (message, client, volume) => {
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
        play(connection, message, client, volume);
      });
    }
  }
};
