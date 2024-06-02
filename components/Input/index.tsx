"use client";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

export type FormFieldProps = {
  label?: string;
  placeholder?: string;
  type: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = <T extends HTMLAttributes<HTMLInputElement>>({
  label,
  id,
  type,
  value,
  checked,
  className,
  onChange,
  ...props
}: T & FormFieldProps) => {
  const [inputValue, setInputValue] = useState(
    type !== "checkbox" ? value || "" : checked || false
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(type !== "checkbox" ? e.target.value : e.target.checked);
    onChange && onChange(e);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    // TODO: Add more complex validation
    if (target.validity.valid) {
      setErrors([]);
    } else {
      setErrors([target.validationMessage]);
    }
  };

  const inputHasErrors = errors.length > 0;
  const mergedClassNames = twMerge(
    "text-neutral-800 dark:text-neutral-100 disabled:text-neutral-500 disabled:dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full rounded-lg border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
    className
  );

  return (
    <div role={label && "group"} className="flex flex-col mb-4 w-full">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <input
        type={type || "text"}
        id={id}
        name={id}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={typeof inputValue !== "boolean" ? inputValue || "" : undefined}
        checked={typeof inputValue === "boolean" && inputValue}
        aria-invalid={inputHasErrors || false}
        aria-errormessage={`${id}-errors`}
        className={mergedClassNames}
        {...props}
      />
      {inputHasErrors && (
        <ul
          id={`${id}-errors`}
          aria-live={inputHasErrors ? "assertive" : "off"}
        >
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const TextInput = <
  T extends HTMLAttributes<HTMLInputElement> & Partial<FormFieldProps>,
>(
  props: T & { minLength?: number }
) => {
  return <Input {...props} type="text" minLength={props.minLength || 2} />;
};

export const EmailInput = <
  T extends HTMLAttributes<HTMLInputElement> & Partial<FormFieldProps>,
>(
  props: T & { pattern?: string }
) => {
  const emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  return (
    <Input {...props} type="email" pattern={props.pattern || emailPattern} />
  );
};

export const PasswordInput = <
  T extends HTMLAttributes<HTMLInputElement> & Partial<FormFieldProps>,
>(
  props: T & { minLength?: number }
) => {
  return <Input {...props} type="password" minLength={props.minLength || 2} />;
};

export default Input;
