import React from "react";

export default function THeader({ dataMapping }) {
    return (
        <thead>
            <tr>
                {dataMapping.map((data, index) => {
                    return <th key={index}>{data.columnName}</th>;
                })}
            </tr>
        </thead>
    );
}
