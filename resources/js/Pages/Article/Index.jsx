import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SimpleTable from "@/Components/Table/SimpleTable";
import DropdownActionRow from "@/Components/Table/DropdownActionRow";

export default function Index({ auth, articles }) {
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link
                            href={route("articles.create")}
                            className="btn btn-neutral"
                        >
                            + Create new
                        </Link>
                        <SimpleTable
                            className="mt-6 text-gray-900"
                            paginationData={articles}
                            columnSearch="title"
                            dataMapping={[
                                {
                                    columnName: "No.",
                                    resource: function (
                                        item,
                                        rowIndex,
                                        colIndex
                                    ) {
                                        return ++rowIndex;
                                    },
                                },
                                {
                                    columnName: "Title",
                                    resource: function (
                                        item,
                                        rowIndex,
                                        colIndex
                                    ) {
                                        return item.title;
                                    },
                                },
                                {
                                    columnName: "Content",
                                    resource: function (
                                        item,
                                        rowIndex,
                                        colIndex
                                    ) {
                                        return item.content;
                                    },
                                },
                                {
                                    columnName: "Username",
                                    resource: function (
                                        item,
                                        rowIndex,
                                        colIndex
                                    ) {
                                        return item.user.name;
                                    },
                                },
                                {
                                    columnName: "Actions",
                                    resource: function (
                                        item,
                                        rowIndex,
                                        colIndex
                                    ) {
                                        return <DropdownActionRow />;
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
