import AltAudioNode from 'altnode.alt-audio-node';
import loadAudio from '@fand/load-audio';

class SampleNode extends AltAudioNode {

  /**
   * @param {AudioContext} ctx
   * @param {string}       url
   */
  constructor (ctx, url) {
    super(ctx);

    this._ctx = ctx;

    this.playbackRate = 1.0;

    loadAudio(this._ctx, url).then((buffer) => {
      this._buffer = buffer;
    });

    this._node = null;
    this._in   = this._ctx.createGain();
    this._out  = this._ctx.createGain();
  }

  get gain () {
    return this._out.gain;
  }

  noteOn () {
    if (!this._buffer) { return; }

    if (this._node) {
      this._node.stop(0);
    }

    const node = this._ctx.createBufferSource();

    node.buffer             = this._buffer;
    node.playbackRate.value = this.playbackRate;

    node.connect(this._out);
    node.start(0);

    this._node = node;
  }

  connect (...args) {
    this._out.connect(...args);
  }

  disconnect (...args) {
    this._out.disconnect(...args);
  }

  dispose() {
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
