import React from "react";

export default function ButtonNavPagination({
    active,
    disable,
    children,
    className,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                "join-item btn btn-sm " +
                (active ? "btn-primary" : "") +
                (disable ? "btn-disabled" : "")
            }
            tabIndex="-1"
            role="button"
            aria-disabled={disable}
        >
            {children}
        </button>
    );
}
