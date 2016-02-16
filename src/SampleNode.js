import AltAudioNode from 'altnode.alt-audio-node';
import loadAudio from '@fand/load-audio';

class SampleNode extends AltAudioNode {

  /**
   * @param {AudioContext} ctx
   * @param {string}       url
   * @param {boolean}      isMonophonic
   */
  constructor (ctx, url, isMonophonic = false) {
    super(ctx);

    this._ctx = ctx;

    this.playbackRate = 1.0;
    this.isMonophonic = isMonophonic;

    loadAudio(this._ctx, url).then((buffer) => {
      this._buffer = buffer;
    });

    this._nodes = [];

    this._in   = this._ctx.createGain();
    this._out  = this._ctx.createGain();
  }

  get gain () {
    return this._out.gain;
  }

  start (time = 0) {
    if (!this._buffer) { return; }

    if (this.isMonophonic) {
      this.stop(Math.max(time - 0.001, 0));
    }

    const node = this._ctx.createBufferSource();

    node.buffer             = this._buffer;
    node.playbackRate.value = this.playbackRate;

    node.connect(this._out);
    node.start(time);

    this._nodes.push(node);
  }

  stop (time = 0) {
    this._nodes.forEach(n => n.stop(time));
    setTimeout(() => this._nodes = [], 0, time);
  }

  connect (...args) {
    this._out.connect(...args);
  }

  disconnect (...args) {
    this._out.disconnect(...args);
  }

  dispose () {
    this._out.disconnect();
    this._out = null;
  }

  __connectFrom (source, ...args) {
    source.connect(this._in, ...args);
  }

  __disconnectFrom (source, ...args) {
    source.disconnect(this._in, ...args);
  }

}

export default SampleNode;
