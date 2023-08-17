import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ButtonLink from "@/Components/Table/ButtonLink";
import { Button, Dropdown, Space, Table } from "antd";
import { useEffect, useState } from "react";
import QueryString from "qs";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const items = [
    {
        label: (
            <Space>
                <EditOutlined />
                Edit
            </Space>
        ),
        key: "edit",
    },
    {
        label: (
            <Space>
                <DeleteOutlined />
                Delete
            </Space>
        ),
        key: "delete",
        danger: true,
    },
];

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        sorter: true,
    },
    {
        title: "Content",
        dataIndex: "content",
        sorter: true,
    },
    {
        title: "Action",
        dataIndex: "data",
        render: (text, record, index) => {
            return (
                <Dropdown
                    menu={{
                        items,
                        onClick: ({ key }) => {
                            switch (key) {
                                case "edit":
                                    console.log(key, record.id);
                                    break;

                                default:
                                    console.log(key, record.id);
                                    break;
                            }
                        },
                    }}
                    trigger={["click"]}
                >
                    <Button size="large" shape="circle">
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            );
        },
    },
];

const getTableParams = (params) => {
    const tableParams = {
        page: params.pagination?.current,
        limit: params.pagination?.pageSize,
    };

    if (params.order !== undefined && params.field !== undefined) {
        tableParams.sort = `${params?.order === "descend" ? "-" : ""}${
            params?.field
        }`;
    }

    return tableParams;
};

export default function Index({ auth }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(
            `http://127.0.0.1:8000/articles/list?${QueryString.stringify(
                getTableParams(tableParams)
            )}`
        )
            .then((response) => response.json())
            .then((payload) => {
                setData(payload.data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: payload.total,
                        pageSize: payload.per_page,
                        current: payload.current_page,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

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
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={loading}
                            rowKey={(record) => record.id}
                            pagination={tableParams.pagination}
                            onChange={handleTableChange}
                            className="tw-mt-6"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
