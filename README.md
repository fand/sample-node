# sample-node

An easy sampler AudioNode.

## Example

```js
import SampleNode from '@fand/sample-node';

const audioContext = new AudioContext();
const sampleNode   = new SampleNode('//example.com/beep.mp3');

sampleNode.connect(audioContext.destination);
sampleNode.noteOn();
```

## LICENSE
MIT
