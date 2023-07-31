import React from "react";

export default function TFooter({ columns }) {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => {
                    return <th key={index}>{column}</th>;
                })}
            </tr>
        </thead>
    );
}
