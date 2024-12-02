import React from 'react';
import AuthLayout from '../AuthLayout';
import ForgetTemplates from '@/components/templates/forgotPassword';

type Props = {}

const Page = (props: Props) => {
    return (
        <AuthLayout>
            <ForgetTemplates />
        </AuthLayout>
    );
};

export default Page;
