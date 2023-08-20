import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Input, Form } from "antd";

export default function FormInput({ auth, pageTitle, formPayload }) {
    const { data, setData, post, put, errors, processing } = useForm({
        title: formPayload?.data?.title,
        content: formPayload?.data?.content,
    });

    const onFinish = () => {
        if (formPayload.type === "create") {
            post(route("articles.store"));
        } else {
            put(
                route("articles.update", {
                    id: formPayload?.data?.id,
                })
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {pageTitle}
                </h2>
            }
        >
            <Head title={`${pageTitle}`} />

            <div className="tw-py-12">
                <div className="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg tw-p-6">
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            className="tw-flex tw-flex-col tw-content-between tw-gap-2"
                        >
                            <Form.Item
                                label="Title"
                                name="title"
                                required
                                validateStatus={errors.title ? "error" : ""}
                                help={errors.title ? errors.title : ""}
                                initialValue={data.title}
                            >
                                <Input
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Content"
                                name="content"
                                required
                                validateStatus={errors.content ? "error" : ""}
                                help={errors.content ? errors.content : ""}
                                initialValue={data.content}
                            >
                                <Input.TextArea
                                    rows={4}
                                    value={data.content}
                                    onChange={(e) => {
                                        setData("content", e.target.value);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={processing}
                                >
                                    {formPayload.submitLabel}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
