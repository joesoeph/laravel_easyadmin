import { Button, Dropdown, Input, Modal, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import QueryString from "qs";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import axios from "axios";

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

export default function List() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState();
    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState({
        isShowModal: false,
        record: null,
    });
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [messageApi, contextHolder] = message.useMessage();

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
            title: "Writer",
            dataIndex: "writer",
            render: (text, record, index) => {
                return `${record.user.name}`;
            },
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
                                        setModalDeleteConfirmation({
                                            record: record,
                                            isShowModal: true,
                                        });
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

    const getQueryString = () => {
        let result = "";
        result += `${QueryString.stringify(getTableParams(tableParams))}`;

        if (search !== "" || search !== null) {
            result += `&${QueryString.stringify({ search })}`;
        }

        return result;
    };

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`http://127.0.0.1:8000/articles/list?${getQueryString()}`)
            .then((response) => response.data)
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
            })
            .catch((error) => {
                messageApi.open({
                    type: "error",
                    content: error,
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams), search]);

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

    const handleSearch = debounce((e) => {
        setSearch(e.target.value);
    }, 1000);

    return (
        <>
            {contextHolder}

            <Modal
                title="Delete Confirmation"
                open={modalDeleteConfirmation.isShowModal}
                centered
                onCancel={() => {
                    setModalDeleteConfirmation((prev) => {
                        return {
                            ...prev,
                            isShowModal: false,
                        };
                    });
                }}
                okText="Yes, Delete it!"
                okType="danger"
                onOk={() => {
                    axios
                        .delete(
                            `http://127.0.0.1:8000/articles/${modalDeleteConfirmation?.record?.id}`
                        )
                        .then((response) => response.data)
                        .then((payload) => {
                            messageApi.open({
                                type: payload.status,
                                content: payload.message,
                            });
                        })
                        .catch((error) => {
                            messageApi.open({
                                type: "error",
                                content: error,
                            });
                        });

                    setModalDeleteConfirmation({
                        ...modalDeleteConfirmation,
                        isShowModal: false,
                    });

                    fetchData();
                }}
            >
                <p>
                    Are you sure to continue delete{" "}
                    <i>"{modalDeleteConfirmation?.record?.title}"</i> ?
                </p>
            </Modal>

            <Input
                placeholder="Search..."
                size="large"
                defaultValue={search}
                onChange={handleSearch}
                className="tw-mt-6"
                allowClear
            />
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey={(record) => record.id}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
                className="tw-mt-6"
            />
        </>
    );
}
