// components/templates/AuthLayout.tsx
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="signup h-screen">
      <div className="flex flex-wrap h-full items-start">
        {/* الجانب الأيسر */}
        <div className="w-full md:w-6/12 flex justify-center h-full bg-[#F0F4FC] py-6 px-4 md:py-8 md:px-8 shadow-custom-blur rounded-tr-[0px] md:rounded-tr-[80px] md:rounded-br-[80px]">
          <div className="welcome-elevate text-center md:text-left">
            <h1 className="text-3xl md:text-5xl leading-tight font-[700]">
              Welcome to
              <span className="block text-[#122D9C] leading-loose">Elevate</span>
            </h1>
            <p className="text-sm md:text-[18px] font-normal leading-loose">
              Quidem autem voluptatibus qui quaerat aspernatur <br /> architecto natus
            </p>
            <div className="flex justify-center md:justify-start mt-4">
              <Image
                width={408}
                height={408}
                src="/asstes/auth/bro.png"
                alt="elevate"
              />
            </div>
          </div>
        </div>

        {/* الجانب الأيمن */}
        <div className="w-full md:w-6/12 py-6 px-4 md:py-8 md:px-8 h-full overflow-y-auto">
          <div className="links flex items-center gap-4 md:gap-6 justify-center md:justify-end">
            <Link href="/login" className="text-[#4461F2] font-[700] text-[16px] md:text-[20px] cursor-pointer">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="border text-[#122D9C] font-[400] text-[16px] md:text-[20px] px-[16px] py-[6px] md:px-[20px] md:py-[8px] rounded-xl cursor-pointer"
            >
              Register
            </Link>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
