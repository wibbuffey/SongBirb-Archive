module.exports = (message) => {
  try {
    message.member.voice.channel.leave();
  } catch (e) {
    message.channel.send("You're not in a VC with me.");
  }
};
