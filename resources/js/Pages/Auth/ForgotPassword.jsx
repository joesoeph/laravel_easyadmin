import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input, Typography, Alert } from "antd";

const { Text } = Typography;

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onFinish = (values) => {
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Text type="secondary">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </Text>

            {status && (
                <div className="tw-my-6">
                    <Alert message={status} type="success" />
                </div>
            )}

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-mt-6"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    required
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email ? errors.email : ""}
                >
                    <Input
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                        className="tw-mt-4"
                    >
                        Email Password Reset Link
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
