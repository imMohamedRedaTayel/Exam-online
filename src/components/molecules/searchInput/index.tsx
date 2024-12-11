import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  placeholder?: string; 
  value: string;     
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const SearchInput = ({ placeholder = "Search...", value, onChange }: Props) => {
  return (
    <div className="flex items-center rounded-[20px] px-3 h-[56px] shadow-lg bg-white border-none ">
      <IoIosSearch className="text-[--mainColor] mr-2" size={25} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent placeholder:text-[--text-gray] text-[--text-gray] border-none focus:ring-0  focus:border-[--mainColor] "
      />
    </div>
  );
};

export default SearchInput;
