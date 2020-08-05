import React, { SelectHTMLAttributes } from 'react';

import './style.css';

type optionSelect = {
  value: string | number;
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string,
  name: string,
  options: optionSelect[]
}

const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" {...rest} >
          <option value="" selected disabled hidden>Selecione uma opção</option>
          {
            options.map((e, key) => {
              return (<option key={`option_${key}`} value={e.value}> {e.label}</option>)
            })
          }
      </select>
    </div> 
  );
}

export default Select;