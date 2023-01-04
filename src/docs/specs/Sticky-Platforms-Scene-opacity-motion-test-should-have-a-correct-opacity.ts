import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: opacity motion test', 'should have a correct opacity');
  import('../../lib/specs/sps-opacity.motion.spec');
});
