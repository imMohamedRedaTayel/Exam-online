import React from 'react';

type Props = {
    label: string;
    value: string;
    isCorrect: boolean;
    isSelected: boolean;
};

export const CustomRadioButton = ({ label, value, isCorrect, isSelected }: Props) => {
    const bgColor = isCorrect
        ? 'bg-[#CAF9CC]' // أخضر للإجابة الصحيحة
        : isSelected
        ? 'bg-[#CC1010] text-white' // أحمر للإجابة الخاطئة
        : 'bg-white'; // أبيض للإجابات الأخرى

    return (
        <div className={`p-2 rounded-lg border border-gray-300 ${bgColor}`}>
            <label className="flex items-center">
                <input
                    type="radio"
                    value={value}
                    disabled
                    className="mr-2"
                />
                <span className='text-[16px] font-normal' >{label}</span>
            </label>
        </div>
    );
};
