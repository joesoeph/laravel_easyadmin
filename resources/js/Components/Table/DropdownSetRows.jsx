import React from "react";

export default function DropdownSetRows() {
    const optionLimits = [15, 25, 50, 100, 150];
    return (
        <div className="join items-center">
            <label className="label w-full">
                <span className="label-text">Rows:</span>
            </label>
            <select className="select w-full max-w-xs">
                {optionLimits.map((limit) => {
                    return <option key={limit}>{limit}</option>;
                })}
            </select>
        </div>
    );
}
