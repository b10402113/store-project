import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type FormInputProps = {
  label?: string;
  type: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
};
function FormInput({
  label,
  type,
  name,
  defaultValue,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
