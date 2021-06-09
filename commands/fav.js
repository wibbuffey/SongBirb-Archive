const config = require("../config")

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};


module.exports = () => {
  if (config.usrfav.includes[message.sender]) {
    config.usrfav[global.song].push(message.sender);
  } else {
    config.usrfav[global.song].remove(message.sender);
  }
}
