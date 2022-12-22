import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: move motion test', 'should be inited');
  import('../../lib/specs/sps-move.motion.spec');
});
