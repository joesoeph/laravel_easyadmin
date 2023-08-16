import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input, Typography } from "antd";

const { Text } = Typography;

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onFinish = () => {
        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Text type="secondary">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </Text>

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-mt-6"
            >
                <Form.Item
                    label="Password"
                    name="password"
                    required
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password ? errors.password : ""}
                >
                    <Input.Password
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                        className="tw-mt-4"
                    >
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
