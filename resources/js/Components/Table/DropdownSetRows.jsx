import React, { useEffect, useState } from "react";
import getQueryParams from "@/Utilities/getQueryParams";
import { router } from "@inertiajs/react";

export default function DropdownSetRows() {
    const currentQueryParams = getQueryParams();
    const optionLimits = [15, 25, 50, 100, 150];
    const [currentLimit, setCurrentLimit] = useState(0);

    useEffect(() => {
        setCurrentLimit(currentQueryParams.limit);
    }, [currentQueryParams]);

    const handleSelectPerPageRows = (e) => {
        const routeParams = { ...currentQueryParams };

        routeParams.limit = e.target.value;
        router.visit(route("articles.index", routeParams), {
            method: "get",
        });

        setCurrentLimit(e.target.value);
    };

    return (
        <div className="join items-center">
            <label className="label w-full">
                <span className="label-text">Rows:</span>
            </label>
            <select
                className="select w-full max-w-xs"
                value={currentLimit}
                onChange={handleSelectPerPageRows}
            >
                <option key={currentLimit} disabled>
                    {currentLimit}
                </option>
                {optionLimits.map((limit) => {
                    if (currentLimit !== limit) {
                        return <option key={limit}>{limit}</option>;
                    }
                })}
            </select>
        </div>
    );
}
