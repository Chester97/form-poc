import React, { forwardRef } from "react";

export const Select = forwardRef(
    ({ id, onChange, onBlur, options, className }, inputRef) => {
        return (
            <select
                onChange={onChange}
                ref={inputRef}
                id={id}
                onBlur={onBlur}
                defaultValue="select"
                className={className}
            >
                <option value="select" disabled>
                    Select option
                </option>
                {options.map((el) => {
                    return (
                        <option key={el} value={el}>
                            {el}
                        </option>
                    );
                })}
            </select>
        );
    }
);
