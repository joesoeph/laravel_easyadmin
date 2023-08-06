import React from "react";
import THeader from "./THeader";
import TFooter from "./TFooter";
import Pagination from "./Pagination";
import DropdownSetRows from "./DropdownSetRows";
import Search from "./Search";
import RenderRows from "./RenderRows";

export default function SimpleTable({
    paginationData,
    columnSearch,
    dataMapping,
}) {
    return (
        <div className="p-6 text-gray-900">
            {/* Filter (Search, Rows per Page) */}
            <div className="flex justify-between items-center">
                <Search columnSearch={columnSearch} />
                <DropdownSetRows />
            </div>
            {/* ./ Filter (Search, Rows per Page) */}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <THeader dataMapping={dataMapping} />
                    <tbody>
                        <RenderRows
                            paginationData={paginationData}
                            dataMapping={dataMapping}
                        />
                    </tbody>
                    <TFooter dataMapping={dataMapping} />
                </table>
            </div>

            {/* Pagination */}
            <div className="text-center mt-12">
                <div className="join">
                    <Pagination paginationLinks={paginationData.links} />
                </div>
            </div>
            {/* ./ Pagination */}
        </div>
    );
}
