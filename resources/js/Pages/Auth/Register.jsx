import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import ButtonLink from "@/Components/Table/ButtonLink";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // submit form
    const onFinish = (values) => {
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-flex tw-flex-col tw-content-between tw-gap-2"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    required
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name ? errors.name : ""}
                >
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </Form.Item>

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
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                    >
                        Register
                    </Button>
                    <ButtonLink href={route("login")}>
                        Already registered?
                    </ButtonLink>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
