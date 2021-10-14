import React, { forwardRef } from "react";

// const comparisonFn = function (prevProps, nextProps) {
//   return prevProps.value === nextProps.value;
// };

export const Input = forwardRef(
    (
        { id, placeholder, type = "text", value = "", onChange, onBlur, className },
        inputRef
    ) => {
        // console.log(id);
        return (
            <input
                ref={inputRef}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
            />
        );
    }
);
