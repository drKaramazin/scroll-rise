export function generateExamples(expectations: Array<string>) {
  if (typeof global !== 'undefined' && (global as any).generateExamples) {
    (global as any).generateExamples(expectations);
  }
}