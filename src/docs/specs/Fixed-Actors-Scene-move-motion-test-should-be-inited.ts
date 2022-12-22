import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: move motion test', 'should be inited');
  import('../../lib/specs/fas-move.motion.spec');
});
