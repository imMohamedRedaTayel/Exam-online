import React from "react";
import Loading from "../loading";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    loading?: boolean; // إضافة خاصية للتحقق من حالة التحميل
}

const Button = ({ children, onClick, className, disabled, loading, ...rest }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`text-[16px] h-[56px] rounded-[20px] ${
                disabled || loading
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#4461F2] text-white"
            } ${className}`}
            disabled={disabled || loading} 
            {...rest}
        >
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
