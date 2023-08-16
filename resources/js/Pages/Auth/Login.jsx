import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import ButtonLink from "@/Components/Table/ButtonLink";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // submit form
    const onFinish = (values) => {
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="tw-my-6">
                    <Alert message={status} type="success" />
                </div>
            )}

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-flex tw-flex-col tw-content-between tw-gap-2"
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

                <Form.Item name="remember">
                    <Checkbox
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    >
                        Remember me
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                    >
                        Log in
                    </Button>
                    {canResetPassword && (
                        <ButtonLink href={route("password.request")}>
                            Forgot yout password?
                        </ButtonLink>
                    )}
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
