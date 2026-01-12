'use client';

import { useState } from 'react';

const Input = ({ id, label, type = 'text', required, placeholder, icon, error, minlength, onStateChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onStateChange) {
      onStateChange(e.target.value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          required={required}
          minLength={minlength}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent input-focus"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <i className={`${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}></i>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
