/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react';
import { CaretDown } from '../../icons';
import { useStyles } from './styles';

type Option = { title: string; value: string };

type Props = {
  value: string;
  options: Option[];
  onSelect?: (value: string) => void;
  width?: number | string;
};

export const Select = ({ value, options, onSelect, width = 32 }: Props) => {
  const currentOption = useMemo(() => options.find((o) => o.value === value), [options, value]);
  if (!currentOption) throw new Error(`There is no option with value "${value}"`);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = useCallback(() => setShowDropdown((val) => !val), []);
  const chooseOption = useCallback((option: Option) => {
    if (onSelect && option.value !== currentOption.value) {
      onSelect(option.value);
    }
  }, [currentOption, options, onSelect]);
  const rootStyle = useMemo(() => ({ width: Number(width) }), [width]);
  const showStyle = useMemo(() => ({
    display: showDropdown ? 'block' : 'none',
  }), [showDropdown]);
  const classes = useStyles();

  return (
    <div className={classes.select} onClick={toggleDropdown} style={rootStyle}>
      <div className="selval">
        {currentOption.title}
      </div>
      <CaretDown size="20" />
      <ul style={showStyle}>
        {options.map((o) => <li key={o.value} onClick={chooseOption.bind(null, o)}>{o.title}</li>)}
      </ul>
    </div>
  );
};
