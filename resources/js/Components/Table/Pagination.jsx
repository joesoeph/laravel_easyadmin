import React from "react";
import ButtonNavPagination from "./ButtonNavPagination";
import htmlEntityDecode from "@/Utilities/htmlEntityDecode";
import getQueryParams from "@/Utilities/getQueryParams";
import { router } from "@inertiajs/react";

export default function Pagination({ paginationLinks }) {
    const handlePageNavigation = (pageURL) => {
        const pageQueryParams = getQueryParams(pageURL);
        router.visit(
            route("articles.index", {
                ...pageQueryParams,
            }),
            {
                method: "get",
            }
        );
    };

    return paginationLinks.map((paginationLink, index) => {
        return (
            <ButtonNavPagination
                key={index}
                disable={paginationLink.url === null}
                active={paginationLink.active}
                onClick={() => {
                    handlePageNavigation(paginationLink.url);
                }}
            >
                {htmlEntityDecode(paginationLink.label)}
            </ButtonNavPagination>
        );
    });
}
