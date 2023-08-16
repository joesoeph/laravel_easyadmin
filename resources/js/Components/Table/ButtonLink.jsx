import { router } from "@inertiajs/react";
import { Button } from "antd";
import React from "react";

export default function ButtonLink({ method, children, href, ...props }) {
    return (
        <Button
            type="link"
            htmlType="button"
            onClick={() => {
                router.visit(href, { method: method ?? "get" });
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
