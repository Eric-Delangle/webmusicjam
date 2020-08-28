import React from 'react';

const FieldList = ({ options,  name, label, onChange, value, error="" }) => (
  <div className="form-group">
    <label>
      {label}
      <br/>
      <br/>
    <select options={options} value= {value} onChange={onChange}  multiple>
      <option  options={options}  value={value}></option>
    </select>
    {error && <p className="invalid-feedback">{ error }</p>}
    </label>
  </div>
);


export default FieldList;
