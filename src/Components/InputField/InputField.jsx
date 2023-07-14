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
     <div className="form__label"> <label>{labelText}</label></div>
     
        <input
          className="form__input"
          autoComplete="off"
          type={type}
          name={name}
          id={id}
          value={value}
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
