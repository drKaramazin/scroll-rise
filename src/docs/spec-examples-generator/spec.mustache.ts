import('../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('{{{description}}}', '{{{expectation}}}');
  import('../../lib/specs/{{{spec}}}');
});
