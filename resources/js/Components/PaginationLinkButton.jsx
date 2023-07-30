import { Link } from "@inertiajs/react";
import React from "react";

export default function PaginationLinkButton({
    active = false,
    disable = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "join-item btn btn-sm " +
                (active ? "btn-primary" : "") +
                (disable ? "btn-disabled" : "") +
                className
            }
            tabIndex="-1"
            role="button"
            aria-disabled={disable}
        >
            {children}
        </Link>
    );
}
