import toast, { Toaster } from 'react-hot-toast';

export const ToastContainer = () => <Toaster />;

export const showToast = {
    success: (message: string) =>
        toast.success(message, {
            position: "top-right",
            duration: 3000,
        }),
    error: (message: string) =>
        toast.error(message, {
            position: "top-right",
            duration: 3000,

        }),

    info: (message: string) =>
        toast(message, {
            icon: 'ℹ️', // يمكنك تغيير الأيقونة إذا أردت
            position: "top-right",
            duration: 3000,
            style: {
                background: '#3b82f6', // يمكنك تخصيص اللون
                color: '#fff',
            },
        }),
};
