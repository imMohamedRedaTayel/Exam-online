import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

  const Button = ({ children, onClick , className ,  ...rest  }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={` text-[16px] h-[56px] rounded-[20px] bg-[#4461F2] text-white ${className} `}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button