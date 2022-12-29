import { DocsSpecsGlobalEnv } from "./docs-specs-global-env";

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const colors = require('colors/safe');

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

(global as DocsSpecsGlobalEnv).runnerResult = {
  total: 0,
  generated: 0,
}

import(path.resolve(__dirname, 'spec-aot-proxy.ts')).then(async proxy => {
  for (const spec of specs) {
    console.log('Spec:', spec);
    proxy.runSpec(outcomePath, path.basename(spec));
    await import(spec);
  }
}).then(() => {
  console.log(
    'Done. '
    + colors.green(`Generated ${(global as DocsSpecsGlobalEnv).runnerResult.generated} of ${(global as DocsSpecsGlobalEnv).runnerResult.total}.`)
    + ` Skipped ${(global as DocsSpecsGlobalEnv).runnerResult.total - (global as DocsSpecsGlobalEnv).runnerResult.generated}.`
  );
});
