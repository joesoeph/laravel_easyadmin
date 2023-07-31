import React, { useEffect, useState } from "react";
import getQueryParams from "@/Utilities/getQueryParams";
import { router } from "@inertiajs/react";

export default function Search({ columnSearch }) {
    const currentQueryParams = getQueryParams();

    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(currentQueryParams[`filter[${columnSearch}]`]);
    }, [columnSearch]);

    const handleEnterSearch = (e) => {
        if (e.key === "Enter") {
            const routeParams = { ...currentQueryParams };
            routeParams[`filter[${columnSearch}]`] = e.target.value;
            router.visit(route("articles.index", routeParams), {
                method: "get",
            });

            setSearch(e.target.value);
        }
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs mb-7"
            defaultValue={search}
            onKeyUp={handleEnterSearch}
        />
    );
}
