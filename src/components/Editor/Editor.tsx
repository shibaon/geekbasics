import React, { useCallback, useMemo, useState } from 'react';
import 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

type Props = { value?: string; onChange?: (value: string) => void; className?: string };

export const Editor = ({ className, value, onChange }: Props) => {
  const onBeforeChange = useCallback((_, __, value) => {
    if (onChange) {
      onChange(value);
    }
  },[onChange]);
  const options = useMemo(() => ({
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    styleActiveLine: true,
  }), []);

  return (
    <CodeMirror
      className={className}
      value={value || ''}
      onBeforeChange={onBeforeChange}
      options={options}
    />
  );
};

export default Editor;
