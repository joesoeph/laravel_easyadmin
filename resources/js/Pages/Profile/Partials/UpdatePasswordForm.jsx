import { useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Form, Input, message } from "antd";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (recentlySuccessful) {
            messageApi.success("Saved");
        }
    }, [recentlySuccessful]);

    const onFinish = () => {
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                form.resetFields();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    form.setFieldsValue({
                        password: "",
                        password_confirmation: "",
                    });
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    form.setFieldsValue({
                        current_password: "",
                    });
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {contextHolder}
            <header>
                <h2 className="tw-text-lg tw-font-medium tw-text-gray-900">
                    Update Password
                </h2>

                <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-flex tw-flex-col tw-content-between tw-gap-2"
                form={form}
            >
                <Form.Item
                    label="Current Password"
                    name="current_password"
                    required
                    validateStatus={errors.current_password ? "error" : ""}
                    help={
                        errors.current_password ? errors.current_password : ""
                    }
                >
                    <Input.Password
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        autoComplete="current-password"
                    />
                </Form.Item>

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
                        onChange={(e) => setData("password", e.target.value)}
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    label="Password Confirmation"
                    name="password_confirmation"
                    required
                    validateStatus={errors.password_confirmation ? "error" : ""}
                    help={
                        errors.password_confirmation
                            ? errors.password_confirmation
                            : ""
                    }
                >
                    <Input.Password
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}
