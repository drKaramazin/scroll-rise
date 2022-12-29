import { DocsSpecsGlobalEnv } from "../../docs/spec-examples-generator/docs-specs-global-env";

export function generateExamples(expectations: Array<string>) {
  if (typeof global !== 'undefined' && (global as DocsSpecsGlobalEnv).generateExamples) {
    (global as DocsSpecsGlobalEnv).generateExamples(expectations);
  }
}