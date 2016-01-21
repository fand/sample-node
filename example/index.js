// To build, run `browserify example/index.js -o example/bundle.js`
const SampleNode = require('../lib/SampleNode');

const ctx = new AudioContext();
const sampleNode = new SampleNode(ctx, './kick.wav');
sampleNode.connect(ctx.destination);

const button = document.querySelector('button');
button.addEventListener('click', () => {
  sampleNode.play();
});
