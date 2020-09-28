/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type Functions = Record<string, (...args: any[]) => any>;

export class Executor {
  protected ignoreCallbacks = false;

  constructor(
    code: string,
    onLineOutput: (line: string) => void,
    onLineError: (line: string) => void,
    functions: Functions = {},
  ) {
    const gbPrint_5637234738 = (...args: any[]) => {
      !this.ignoreCallbacks && onLineOutput(args.map((a) => String(a)).join(' '));
    };
    const gbPrintError_3t423434 = (...args: any[]) => {
      !this.ignoreCallbacks && onLineError(args.map((a) => String(a)).join(' '));
    }
    let injectFunctions = '';
    for (const func of Object.keys(functions)) {
      injectFunctions += `const ${func} = functions.${func};\n`;
    }
    try {
      code && 
      eval(
        injectFunctions + code
          .replace(/console\.log/g, 'gbPrint_5637234738')
          .replace(/console\.error/g, 'gbPrintError_3t423434')
      );
    } catch (err) {
      gbPrintError_3t423434(err.message);
    }
  }

  public kill() {
    this.ignoreCallbacks = true;
  }
}

export const execute = (
  code: string,
  onLineOutput: (line: string) => void,
  onLineError: (line: string) => void,
  functions: Functions = {},
) => {
  return new Executor(code, onLineOutput, onLineError, functions);
};
