module.exports = (message) => {
  try {
    message.member.voice.channel.leave();
    message.channel.send("I left the VC.")
  } catch (e) {
    message.channel.send("You're not in a VC with me.");
  }
};
