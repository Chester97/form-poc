import React from "react";

export const Error = ({ message = "" }) => {
    return (
        message && (
            <div>
                <p className="error">{message}</p>
            </div>
        )
    );
};
