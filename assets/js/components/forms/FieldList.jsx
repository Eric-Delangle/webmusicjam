import React from 'react';
import Select from 'react-select';

const FieldList = ({ name, label, value, onChange, options, placeholder = "", type = "text ", error = "" }) => (
<div className="form-group">
    <Select
        value={value}
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
    />
    </div>
);


export default FieldList;

