import React from "react";

export default function TextInput({
    label,
    placeholder,
    error,
    required,
    ...props
}) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{`${label} ${
                    required ? "*" : ""
                }`}</span>
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className={`input input-sm input-bordered ${
                    error ? "input-error" : ""
                }`}
                required={required}
                {...props}
            />
            <label className="label">
                <span className="label-text-alt text-error">{error}</span>
            </label>
        </div>
    );
}
