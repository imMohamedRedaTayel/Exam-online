import Link from "next/link";
import React from "react";

type CardProps = {
  id: string;
  icon: string;
  name: string;
};

const Card = ({ id, icon, name }: CardProps) => {
  return (
    <Link href={`/dashboard/exam/${id}`} key={id} className="w-full md:w-4/12 cursor-pointer ">
      <div className="relative px-[16px] mb-[24px]">
        {icon ? (
          <img src={icon} alt={name} className="w-full h-auto" />
        ) : (
          <div className="w-full h-[150px] bg-gray-300 animate-pulse"></div> 
        )}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[20px] p-3 w-[80%] rounded-[10px] bg-[#1935CA66] backdrop-blur-sm">
          <h4 className="text-[13px] font-[700] text-white">
            {name || <span className="w-24 h-4 bg-gray-300 animate-pulse"></span>} 
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
