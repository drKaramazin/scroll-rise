import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: move motion test', 'should have a correct X, Y coords in changing both X and Y');
  import('../../lib/specs/fas-move.motion.spec');
});
