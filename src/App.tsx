import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Controls from './components/Controls';
import { Editor } from './components/Editor';
import Output from './components/output';
import { useStyles } from './styles';

function App() {
  const classes = useStyles();
  const startSizePos = useRef<[number, number]>();
  const startSizeWidth = useRef<number>();
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [execCode, setExecCode] = useState<{ code: string }>();
  const onExecute = useCallback(() => {
    localStorage.setItem('code', code);
    setExecCode({ code });
  }, [code]);
  const [leftSideWidth, setLeftSideWidth] = useState(document.body.clientWidth / 2);
  const leftSideStyle = useMemo(() => ({ width: `${leftSideWidth}px` }), [leftSideWidth]);
  const [curMousePos, setCurMousePos] = useState<[number, number]>([0, 0]);
  const onGripperMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    startSizePos.current = curMousePos;
    startSizeWidth.current = leftSideWidth;
  }, [curMousePos, leftSideWidth]);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      const pos = [e.screenX, e.screenY] as [number, number];
      setCurMousePos(pos);
      if (startSizePos.current && startSizeWidth.current) {
        setLeftSideWidth(startSizeWidth.current + pos[0] - startSizePos.current[0]);
      }
    };
    const upHandler = () => {
      startSizePos.current = undefined;
      startSizeWidth.current = undefined;
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.leftSide} style={leftSideStyle}>
        <Controls onExecute={onExecute} />
        <Editor className={classes.editor} onChange={setCode} value={code} />
        <div className={classes.gripper} onMouseDown={onGripperMouseDown}></div>
      </div>
      <Output className={classes.output} program={execCode} />
    </div>
  );
}

export default App;
