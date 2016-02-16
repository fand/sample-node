const SampleNode = require('@fand/sample-node');

const ctx     = new AudioContext();
const wavNode = new SampleNode(ctx, './kick.wav');
const mp3Node = new SampleNode(ctx, './kick.mp3');
wavNode.connect(ctx.destination);
mp3Node.connect(ctx.destination);

document.querySelector('.wav').addEventListener('click', () => {
  wavNode.start(0);
});

document.querySelector('.mp3').addEventListener('click', () => {
  mp3Node.start(0);
});
