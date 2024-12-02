import React from 'react';
import AuthLayout from '../AuthLayout';
import VerifyCodeTemplates from '@/components/templates/verifyCode';

type Props = {}

const Page = (props: Props) => {
    return (
        <AuthLayout>
            <VerifyCodeTemplates />
        </AuthLayout>
    );
};

export default Page;
