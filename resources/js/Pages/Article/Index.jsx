import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonLink from "@/Components/Table/ButtonLink";
import List from "./Partials/List";

export default function Index({ auth, csrf_token }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="tw-font-semibold tw-text-xl tw-text-gray-800 tw-leading-tight">
                    Articles
                </h2>
            }
        >
            <Head title="Articles" />
            <div className="tw-py-12">
                <div className="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg tw-p-6">
                        <div className="tw-text-right">
                            <ButtonLink
                                href={route("articles.create")}
                                type="primary"
                            >
                                + Create new
                            </ButtonLink>
                            <List csrf_token={csrf_token} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
