import DropdownActionRow from "@/Components/Table/DropdownActionRow";
import DropdownSetRows from "@/Components/Table/DropdownSetRows";
import TFooter from "@/Components/Table/TFooter";
import THeader from "@/Components/Table/THeader";
import Pagination from "@/Components/Table/Pagination";
import Search from "@/Components/Table/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function renderRows(lists) {
    return lists.map((list, index) => {
        return (
            <tr key={list.id}>
                <td>{++index}</td>
                <td>{list.title}</td>
                <td>{list.content}</td>
                <td>{list.user.name}</td>
                <td>
                    <DropdownActionRow />
                </td>
            </tr>
        );
    });
}

export default function Index({ auth, articles }) {
    const columns = ["No.", "Title", "Content", "Writer", "Action"];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Articles
                </h2>
            }
        >
            <Head title="Articles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Filter (Search, Rows per Page) */}
                            <div className="flex justify-between items-center">
                                <Search columnSearch="title" />
                                <DropdownSetRows />
                            </div>
                            {/* ./ Filter (Search, Rows per Page) */}

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <THeader columns={columns} />
                                    <tbody>{renderRows(articles.data)}</tbody>
                                    <TFooter columns={columns} />
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="text-center mt-12">
                                <div className="join">
                                    <Pagination
                                        paginationLinks={articles.links}
                                    />
                                </div>
                            </div>
                            {/* ./ Pagination */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
