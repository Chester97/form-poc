import React, { forwardRef } from "react";

export const Checkbox = forwardRef(
    ({ id, onChange, value, label, className }, inputRef) => {
        return (
            <label htmlFor={id}>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    ref={inputRef}
                    id={id}
                    className={className}
                />{" "}
                {label}
            </label>
        );
    }
);
