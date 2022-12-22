var sanitize = require("sanitize-filename-truncate");
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');

export function runSpec(outcomePath: string, spec: string) {

  global.describe = global.xdescribe = function (description: string, specDefinitions: () => void): void {

    global.beforeEach = global.afterEach = function (action: jasmine.ImplementationCallback) {}

    global.it = global.xit = function (expectation: string, assertion?: jasmine.ImplementationCallback) {
      const filename = sanitize(`${description} ${expectation}`, {
        convertWhiteSpace: '-'
      }) + '.ts';
      console.log(filename);

      const template = fs.readFileSync(path.join(__dirname, 'spec.mustache.ts'),{ encoding:'utf8' });
      const output = Mustache.render(template, {
        description,
        expectation,
        spec: spec.slice(0, spec.lastIndexOf('.')),
      });

      fs.writeFileSync(path.join(outcomePath, filename), output,{ encoding:'utf8' });
    }

    specDefinitions();

  }

}