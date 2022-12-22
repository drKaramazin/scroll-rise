const fs = require('fs');

const path = require('path');
const glob = require('glob');

function prepareOutcomeDir(outcomePath: string) {
  fs.rmSync(outcomePath, {
    force: true,
    recursive: true,
  });
  fs.mkdirSync(outcomePath, {
    recursive: true,
  });
}

const specs: Array<string> = glob.sync(path.resolve(__dirname, '..', '..', 'lib', 'specs') + '/**/*.spec.ts');

console.log('Generation...');

const outcomePath = path.join(__dirname, '..', 'specs');
prepareOutcomeDir(outcomePath);

import(path.resolve(__dirname, 'spec-aot-proxy.ts')).then(async proxy => {
  for (const spec of specs) {
    console.log('Spec:', spec);
    proxy.runSpec(outcomePath, path.basename(spec));
    await import(spec);
  }
}).then(() => console.log('Done.'));
