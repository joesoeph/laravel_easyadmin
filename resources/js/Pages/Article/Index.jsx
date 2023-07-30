import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, articles }) {
    function rows(lists) {
        return lists.map((list) => {
            return (
                <tr key={list.id}>
                    <td>{list.title}</td>
                    <td>{list.content}</td>
                    <td>{list.user.name}</td>
                    <td>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <button className="btn btn-circle btn-outline btn-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                    />
                                </svg>
                            </button>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            );
        });
    }

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
                            <div className="flex justify-between items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered w-full max-w-xs mb-7"
                                />
                                <div className="join items-center">
                                    <label className="label w-full">
                                        <span className="label-text">
                                            Rows:
                                        </span>
                                    </label>
                                    <select className="select w-full max-w-xs">
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                        <option>150</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Writer</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>{rows(articles.data)}</tbody>
                                </table>
                            </div>
                            <div className="text-center mt-12">
                                <div className="join">
                                    <button className="join-item btn">
                                        First
                                    </button>
                                    <button className="join-item btn">
                                        Prev
                                    </button>
                                    <div className="join px-4">
                                        <label className="label w-full">
                                            <span className="label-text">
                                                Page:
                                            </span>
                                        </label>
                                        <select className="select w-full max-w-xs">
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>150</option>
                                        </select>
                                    </div>
                                    <button className="join-item btn">
                                        Next
                                    </button>
                                    <button className="join-item btn">
                                        Last
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
