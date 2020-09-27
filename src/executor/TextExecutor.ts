/* eslint-disable no-eval */

export class TextExecutor {
  protected ignoreCallbacks = false;

  constructor(code: string, onLineOutput: (line: string) => void, onLineError: (line: string) => void) {
    const gbPrint_5637234738 = (...args: any[]) => {
      !this.ignoreCallbacks && onLineOutput(args.map((a) => String(a)).join(' '));
    };
    const gbPrintError_3t423434 = (...args: any[]) => {
      !this.ignoreCallbacks && onLineError(args.map((a) => String(a)).join(' '));
    }
    try {
      code && 
      eval(
        code
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

export const executeTextMode = (
  code: string,
  onLineOutput: (line: string) => void,
  onLineError: (line: string) => void
) => {
  return new TextExecutor(code, onLineOutput, onLineError);
};
