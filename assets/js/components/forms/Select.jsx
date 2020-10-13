import React from 'react';

const Select = ({value, error="", label, onChange, children }) => {
    return (
    <div className="form-group">
    <label htmlFor= { name }>{ label }</label>
    <select 
        multiple
        onChange = { onChange } 
        name={ name } 
      //  id={ name } 
        className={"form-control" + ( error && " is-valid")}
        value={ value }
        >
       { children }
    </select>
    <p className="invalid-feedback">{ error }</p>
</div>  );
}
 
export default Select;