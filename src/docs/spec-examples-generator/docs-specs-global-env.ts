export type DocsSpecsGlobalEnv = Window & typeof globalThis & {
  skipTesting: boolean;
  runnerResult: {
    total: number;
    generated: number;
  },
  generateExamples: (expectations: Array<string>) => void,
}
