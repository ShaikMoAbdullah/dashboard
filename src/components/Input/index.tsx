import React from "react";

const Input = ({
  name,
  id,
  title,
  placeholder,
  type,
  value,
  onChange,
  disabled,
}: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <label htmlFor={id}>{title}</label>
      <input
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`rounded-lg p-2 ${
          disabled ? "bg-zinc-800 cursor-not-allowed" : "bg-zinc-700"
        }`}
      />
    </div>
  );
};

export default Input;
