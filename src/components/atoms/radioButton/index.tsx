import React from "react";

type RadioButtonProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
};

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
    return (
        <div className={` ${ checked ? "bg-[#CCD7EB]  " : "bg-[#EDEFF3]" } hover:bg-[#D0DBE9] transition-colors  w-full px-[8px] py-[16px] rounded-[10px] cursor-pointer `}>
            <label className="flex items-center gap-2 cursor-pointer ">
                <input
                    type="radio"
                    name="answer"
                    value={value}
                    checked={checked}
                    onChange={() => onChange(value)}
                    className="h-4 w-4 cursor-pointer "
                />
                <span className="text-[16px] font-normal ">{label}</span>
            </label>
        </div>
    );
};

export default RadioButton;
