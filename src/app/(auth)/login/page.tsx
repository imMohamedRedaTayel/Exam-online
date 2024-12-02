import LoginTemplates from '@/components/templates/login';
import React from 'react';
import AuthLayout from '../AuthLayout';

type Props = {}

const Page = (props: Props) => {
    return (
        <AuthLayout>
            <LoginTemplates />
        </AuthLayout>
    );
};

export default Page;
