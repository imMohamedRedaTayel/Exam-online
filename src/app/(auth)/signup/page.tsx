import SignupTemplates from '@/components/templates/signup';
import React from 'react';
import AuthLayout from '../AuthLayout';

type Props = {}

const Page = (props: Props) => {
    return (
        <AuthLayout>
            <SignupTemplates />
        </AuthLayout>
    );
};

export default Page;
