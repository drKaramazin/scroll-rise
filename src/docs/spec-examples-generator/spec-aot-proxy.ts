import { DocsSpecsGlobalEnv } from "./docs-specs-global-env";

const sanitize = require("sanitize-filename-truncate");
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');

export function runSpec(outcomePath: string, spec: string) {

  global.describe = global.xdescribe = function (description: string, specDefinitions: () => void): void {

    let expectationsForGeneration: Array<string> = [];

    global.beforeEach = global.afterEach = function (action: jasmine.ImplementationCallback) {};

    (global as DocsSpecsGlobalEnv).generateExamples = function (expectations: Array<string>) {
      expectationsForGeneration = expectations;
    };

    global.it = global.xit = function (expectation: string, assertion?: jasmine.ImplementationCallback) {
      (global as DocsSpecsGlobalEnv).runnerResult.total++;
      if (expectationsForGeneration.includes(expectation)) {
        const filename = sanitize(`${description} ${expectation}`, {
          convertWhiteSpace: '-'
        }) + '.ts';
        console.log(colors.green('Generated.') + ` ${description} ${expectation}`);

        const template = fs.readFileSync(path.join(__dirname, 'spec.mustache.ts'),{ encoding:'utf8' });
        const output = Mustache.render(template, {
          description,
          expectation,
          spec: spec.slice(0, spec.lastIndexOf('.')),
        });

        fs.writeFileSync(path.join(outcomePath, filename), output,{ encoding:'utf8' });

        (global as DocsSpecsGlobalEnv).runnerResult.generated++;
      } else {
        console.log(colors.red('Skipped.') + ` ${description} ${expectation}`);
      }
    };

    specDefinitions();
  }
}