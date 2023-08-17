import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import ButtonLink from "@/Components/Table/ButtonLink";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";

const items = [
    {
        label: (
            <ButtonLink type="ghost" href={route("profile.edit")}>
                Profile
            </ButtonLink>
        ),
        key: "0",
    },
    {
        label: (
            <ButtonLink type="ghost" href={route("logout")} method="post">
                Log out
            </ButtonLink>
        ),
        key: "1",
    },
];

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="tw-min-h-screen tw-bg-gray-100">
            <nav className="tw-bg-white tw-border-b tw-border-gray-100">
                <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-flex tw-justify-between tw-h-16">
                        <div className="tw-flex">
                            <div className="tw-shrink-0 tw-flex tw-items-center">
                                <Link href="/">
                                    <ApplicationLogo className="tw-block tw-h-9 tw-w-auto tw-fill-current tw-text-gray-800" />
                                </Link>
                            </div>

                            <div className="tw-hidden tw-space-x-2 sm:-tw-my-px sm:tw-ml-10 sm:tw-flex sm:tw-items-center">
                                <ButtonLink
                                    href={route("dashboard")}
                                    disabled={route().current("dashboard")}
                                >
                                    Dashboard
                                </ButtonLink>
                                <ButtonLink
                                    href={route("articles.index")}
                                    disabled={route().current("articles.index")}
                                >
                                    Articles
                                </ButtonLink>
                            </div>
                        </div>

                        <div className="tw-hidden sm:tw-flex sm:tw-items-center sm:tw-ml-6">
                            <div className="tw-ml-3 tw-relative">
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    trigger={["click"]}
                                >
                                    <Button
                                        type="ghost"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Space>
                                            {user.name}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-tw-mr-2 tw-flex tw-items-center sm:tw-hidden">
                            <Button
                                type="ghost"
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500 hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-bg-gray-100 focus:tw-text-gray-500 tw-transition tw-duration-150 tw-ease-in-out"
                            >
                                <MenuOutlined />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "tw-block" : "tw-hidden") +
                        " sm:tw-hidden"
                    }
                >
                    <div className="tw-pt-2 tw-pb-3 tw-space-y-1 tw-flex tw-flex-col tw-items-start">
                        <ButtonLink
                            href={route("dashboard")}
                            disabled={route().current("dashboard")}
                        >
                            Dashboard
                        </ButtonLink>
                        <ButtonLink
                            href={route("articles.index")}
                            disabled={route().current("articles.index")}
                        >
                            Articles
                        </ButtonLink>
                    </div>

                    <div className="tw-pt-4 tw-pb-1 tw-border-t tw-border-gray-200">
                        <div className="tw-px-4">
                            <div className="tw-font-medium tw-text-base tw-text-gray-800">
                                {user.name}
                            </div>
                            <div className="tw-font-medium tw-text-sm tw-text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="tw-mt-3 tw-space-y-1">
                            <ButtonLink
                                href={route("profile.edit")}
                                disabled={route().current("profile.edit")}
                            >
                                Profile
                            </ButtonLink>
                            <ButtonLink
                                method="post"
                                href={route("logout")}
                                disabled={route().current("logout")}
                            >
                                Log Out
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="tw-bg-white tw-shadow">
                    <div className="tw-max-w-7xl tw-mx-auto tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
