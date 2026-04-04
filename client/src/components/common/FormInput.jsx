import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder,
  options,
  multiple = false
}) => {
  const inputProps = {
    name,
    id: name,
    value,
    onChange,
    placeholder,
    required,
    className: `form-input ${error ? 'error' : ''}`
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      
      {type === 'select' ? (
        <select 
          {...inputProps}
          className={`form-select ${error ? 'error' : ''}`}
          multiple={multiple}
        >
          <option value="">Select</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea 
          {...inputProps}
          className={`form-textarea ${error ? 'error' : ''}`}
        />
      ) : (
        <input 
          {...inputProps}
          type={type}
        />
      )}
      
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default FormInput;
