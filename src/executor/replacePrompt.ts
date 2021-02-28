// TODO: use abstract syntax tree to replace prompt only in top-level function and not in inner functions
export const replacePrompt = (code: string) => {
  return code.replace(/prompt( )?\(/, 'await asyncPrompt(');
};
