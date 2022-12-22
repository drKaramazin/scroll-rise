import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: size motion test', 'should be inited');
  import('../../lib/specs/fas-size.motion.spec');
});
