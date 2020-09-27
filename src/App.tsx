import React, { useCallback, useState } from 'react';
import Controls from './components/Controls';
import { Editor } from './components/Editor';
import Output from './components/output';
import { useStyles } from './styles';
import { CodeMode } from './types';

function App() {
  const classes = useStyles();
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [mode, setMode] = useState((localStorage.getItem('mode') || 'text') as CodeMode);
  const [execCode, setExecCode] = useState<{ mode: CodeMode, code: string }>();
  const onExecute = useCallback(() => {
    localStorage.setItem('code', code);
    setExecCode({ mode, code });
  }, [code, mode]);

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <Controls mode={mode} onExecute={onExecute} onModeSelect={setMode} />
        <Editor className={classes.editor} onChange={setCode} value={code} />
      </div>
      <Output className={classes.output} program={execCode} />
    </div>
  );
}

export default App;
