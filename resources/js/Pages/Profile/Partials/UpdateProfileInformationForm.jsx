import { useForm, usePage } from "@inertiajs/react";
import { Alert, Button, Form, Input, message } from "antd";
import { useEffect } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [messageApi, contextHolder] = message.useMessage();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    useEffect(() => {
        if (recentlySuccessful) {
            messageApi.success("Saved");
        }
    }, [recentlySuccessful]);

    const onFinish = () => {
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            {contextHolder}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

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
                    initialValue={data.name}
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
                    initialValue={data.email}
                >
                    <Input
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Item>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="tw-text-sm tw-mt-2 tw-text-gray-800">
                            Your email address is unverified.
                            <ButtonLink
                                type="link"
                                href={route("verification.send")}
                                method="post"
                            >
                                Click here to re-send the verification email.
                            </ButtonLink>
                        </p>

                        {status === "verification-link-sent" && (
                            <Alert
                                message="
                                A new verification link has been sent to your
                                email address."
                                type="success"
                            />
                        )}
                    </div>
                )}

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
