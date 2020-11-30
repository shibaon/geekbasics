import React, { useCallback, useState } from 'react';
import Controls from './components/Controls';
import { Editor } from './components/Editor';
import Output from './components/output';
import { useStyles } from './styles';

function App() {
  const classes = useStyles();
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [execCode, setExecCode] = useState<{ code: string }>();
  const onExecute = useCallback(() => {
    localStorage.setItem('code', code);
    setExecCode({ code });
  }, [code]);

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <Controls onExecute={onExecute} />
        <Editor className={classes.editor} onChange={setCode} value={code} />
      </div>
      <Output className={classes.output} program={execCode} />
    </div>
  );
}

export default App;
