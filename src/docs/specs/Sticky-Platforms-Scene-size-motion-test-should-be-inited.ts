import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: size motion test', 'should be inited');
  import('../../lib/specs/sps-size.motion.spec');
});