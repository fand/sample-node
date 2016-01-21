import assert       from 'power-assert';
import SampleNode   from '../src/SampleNode';
import AltAudioNode from 'altnode.alt-audio-node';

describe('SampleNode', () => {
  let audioContext = null;
  let node;

  beforeEach(() => {
    audioContext = new global.AudioContext();
    node         = new SampleNode(audioContext, '');
  });

  it('is an instance of AudioNode', () => {
    assert(node instanceof SampleNode);
    assert(node instanceof AltAudioNode);
    assert(node instanceof global.AudioNode);
  });

});
