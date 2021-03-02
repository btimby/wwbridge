const WWBBase = require('./base');


/* This class runs in the Web Worker. */
class WWBackground extends WWBBase {
  constructor(options) {
    const { timeout, foreground, background } = options;

    super(timeout, background, foreground);
    if (options.init) options.init.apply(this);
    if (background && background.init) {
      background.init.apply(this);
    }
    this._id = 0; // Use evens.
    // Listen for messages from the UI.
    self.addEventListener('message', this._onMessage.bind(this));
  }

  /* Post a message _from_ the web worker. */
  _postMessage(dir, name, id, ...args) {
    self.postMessage([dir, name, id, ...args]);
  }
}

module.exports = WWBackground;
