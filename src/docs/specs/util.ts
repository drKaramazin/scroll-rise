export function runTest(targetExpectation: string) {

  window.describe = function (description: string, specDefinitions: () => void): void {

    window.expect = function () {
      return {
        withContext: () => {
          toEqual: (val: any) => {}
        },
      } as any;
    }

    window.jasmine = {
      addMatchers: () => {},
    } as any;

    const done = {
      fail: (message: string) => {
        console.error(message);
      }
    };

    window.beforeEach = function (action: jasmine.ImplementationCallback) {
      action((() => {}) as any);
    }

    window.afterEach = function (action: jasmine.ImplementationCallback) {}

    function surroundedIt(expectation: string, assertion?: jasmine.ImplementationCallback) {
      if (expectation === targetExpectation) {
        if (assertion) {
          const result = assertion((() => {}) as any);
          console.log(result);
        }
      }
    }

    window.it = function (expectation: string, assertion?: jasmine.ImplementationCallback) {
      surroundedIt(expectation, assertion);
    }

    window.xit = function (expectation: string, assertion?: jasmine.ImplementationCallback) {
      surroundedIt(expectation, assertion);
    }

    specDefinitions();
  }

}
