import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Form, Typography } from "antd";
import ButtonLink from "@/Components/Table/ButtonLink";

const { Text } = Typography;

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const onFinish = () => {
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Text className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </Text>

            {status === "verification-link-sent" && (
                <div className="tw-my-6">
                    <Alert
                        message="
                    A new verification link has been sent to the email address
                    you provided during registration."
                        type="success"
                    />
                </div>
            )}

            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="tw-flex tw-flex-col tw-content-between tw-gap-2 tw-mt-6"
            >
                <div className="mt-4 flex items-center justify-between">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={processing}
                        >
                            Resend Verification Email
                        </Button>
                    </Form.Item>

                    <ButtonLink href={route("logout")} method="post">
                        Log out
                    </ButtonLink>
                </div>
            </Form>
        </GuestLayout>
    );
}
