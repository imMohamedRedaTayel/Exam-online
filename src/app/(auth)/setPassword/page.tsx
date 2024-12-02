import React from 'react';
import AuthLayout from '../AuthLayout';
import SetPasswordTemplates from '@/components/templates/setPassword';

type Props = {}

const Page = (props: Props) => {
    return (
        <AuthLayout>
            <SetPasswordTemplates />
        </AuthLayout>
    );
};

export default Page;
