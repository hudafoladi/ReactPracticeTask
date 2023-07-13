import React from "react";
const InputField = ({
  labelText,
  type,
  name,
  id,
  value,
  handleChange,
  placeholder,
  isError = false,
}) => {
  return (
    <div className="form__fieldHolder">
      <label className="form__label">{labelText}</label>
      <input
        autoComplete="off"
        type={type}
        name={name}
        id={id}
        value={value}
        className="form__input"
        onChange={(e) => {
          handleChange(e.target);
        }}
        placeholder={placeholder}
      />
      {isError && <span>Error!</span>}
    </div>
  );
};
export default InputField;
