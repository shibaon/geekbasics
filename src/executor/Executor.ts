/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { replacePrompt } from './replacePrompt';

export type Functions = Record<string, (...args: any[]) => any>;

export class Executor {
  protected iframe?: HTMLIFrameElement;

  constructor(
    code: string,
    onLineOutput: (line: string) => void,
    onLineError: (line: string) => void,
    functions: Functions = {},
  ) {
    this.kill();
    if (!code) return;
 
    this.iframe = document.createElement('iframe');
    // eslint-disable-next-line no-script-url
    this.iframe.src = 'about:blank';
    document.body.append(this.iframe);

    const iframeWindow = this.iframe.contentWindow as unknown as Window & typeof globalThis;
    iframeWindow.console.error = (...args: any[]) => {
      onLineError(args.map((a) => String(a)).join(' '));
    };
    iframeWindow.console.log = (...args: any[]) => {
      onLineOutput(args.map((a) => String(a)).join(' '));
    };
    for (const key in functions) {
      (iframeWindow as any)[key] = functions[key];
    }
    (iframeWindow as any).asyncPrompt = async (greeting: string, defaultValue?: string) => new Promise((resolve) => {
      setTimeout(() => resolve(prompt(greeting, defaultValue)), 0);
    });
    code = replacePrompt(code);
    code = `(async () => { await new Promise((r) => setTimeout(r, 0)); ${code} })().catch((err) => {
      console.error(err.stack.split('\\n').slice(0, 2).join(' '));
    })`;
    (iframeWindow as any).code = code;

    const iframeDoc = iframeWindow.document.open();
    iframeDoc.write(`<script>
      try { eval(window.code) } catch (err) { console.error(err.stack.split('\\n').slice(0, 2).join(' ')) }
    </script>`);
    iframeDoc.close();
  }

  public kill() {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe.contentWindow?.location.reload();
      this.iframe.remove();
    }
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
