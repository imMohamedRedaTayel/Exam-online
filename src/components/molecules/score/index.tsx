import Button from '@/components/atoms/button'
import React, { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

const Score = ({ score, correctAnswers, incorrectAnswers }: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(true); // حالة للتحكم في عرض الـ div بالكامل

    // دالة لإخفاء الـ div عند الضغط على الزر
    const handleHideModal = () => {
        setIsModalVisible(false); // تعيين الحالة إلى false لإخفاء الـ div
    }

    return (
        <>
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px]">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-[22px] font-[500]">
                                Your score
                            </h2>
                        </div>

                        <div className="py-[24px]">
                            <div className="flex items-center justify-around">
                                <div className="w-[132px] h-[132px]">
                                    <CircularProgressbar value={score} text={`${score}%`}
                                        styles={buildStyles({
                                            pathColor: `#02369C`,
                                            textColor: '#000',
                                            backgroundColor: '#3e98c7',
                                        })} />
                                </div>
                                <div className="correct flex flex-col gap-y-3">
                                    <div className="flex items-center gap-x-7">
                                        <h2 className="text-[#02369C] text-[22px] font-[500]">Correct</h2>
                                        <div className="flex items-center justify-center bg-transparent border border-[#02369C] w-[32px] h-[32px] rounded-full">
                                            <span className="text-[16px] font-[500] text-[#02369C]">{correctAnswers}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-[#CC1010] text-[22px] font-[500]">Incorrect</h2>
                                        <div className="flex items-center justify-center bg-transparent border border-[#CC1010] w-[32px] h-[32px] rounded-full">
                                            <span className="text-[16px] font-[500] text-[#CC1010]">{incorrectAnswers}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-6 flex justify-between gap-[50px]">
                            <Button
                                onClick={handleHideModal} // عند الضغط على الزر، سنخفي الـ div
                                className="!h-[50px] bg-transparent border border-[--mainColor] !text-[--mainColor] rounded-[100px] w-full"
                            >
                                Back
                            </Button>
                            <Button
                                className="!h-[50px] bg-[--mainColor] text-white rounded-[100px] w-full"
                            >
                                Show results
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Score;
