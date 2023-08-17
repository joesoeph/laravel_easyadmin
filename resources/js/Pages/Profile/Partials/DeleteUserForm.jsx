import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Form, Input, Modal, Space } from "antd";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const [form] = Form.useForm();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const onFinish = () => {
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => {
                reset();
                form.resetFields();
            },
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        form.resetFields();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="tw-text-lg tw-font-medium tw-text-gray-900">
                    Delete Account
                </h2>

                <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button type="primary" danger onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Modal
                centered
                style={{
                    top: 20,
                }}
                open={confirmingUserDeletion}
                footer={null}
            >
                <h2 className="tw-text-lg tw-font-medium tw-text-gray-900">
                    Are you sure you want to delete your account?
                </h2>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="tw-flex tw-flex-col tw-content-between tw-gap-2"
                >
                    <Form.Item
                        label="Password"
                        name="password"
                        required
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password ? errors.password : ""}
                    >
                        <Input.Password
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </Form.Item>

                    <Form.Item className="tw-text-right">
                        <Space>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button
                                type="primary"
                                danger
                                htmlType="submit"
                                loading={processing}
                            >
                                Delete Account
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}
