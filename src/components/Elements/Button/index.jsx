import React from "react";

const Button = (props) => {
    const { children = "button", type = "button", className, startScan, scanning } = props;
    return (
        <button className={`px-4 py-2 bg-blue-700 rounded-md cursor-pointer ${className}`} type={type} onClick={startScan} disabled={scanning}>
            {children}
        </button>
    )
}

export default Button;
