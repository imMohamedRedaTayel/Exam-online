import React, { useState } from "react";
import Button from "@/components/atoms/button";
import Image from "next/image";
import RadioButton from "../radioButton";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {

    if (!isOpen) return null;

 
        const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

        const handleSelectAnswer = (answer: string) => {
            setSelectedAnswer(answer);
        };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px]">

                <div className="flex items-center justify-between" >
                    <h2 className="text-[14px] font-[500] text-[--mainColor] "> Question 1 of 20 </h2>
                    <div className="flex items-center gap-[3px] " >
                        <Image
                            src={'/asstes/exams/clock.png'}
                            alt="clock"
                            width={24}
                            height={30}
                        />
                        <span className="text-[20px] font-[400] text-[#11CE19] " >14.59</span>
                    </div>
                </div>

                <div className="py-[24px]" >
                    <h2 className="text-[24px] font-[500]" > Exercitationem pariatur quae facere vel id est illo velit aut. </h2>
                </div>

                <div>
                    <div className=" flex flex-col gap-[16px] ">
                        <RadioButton
                            label="Answer 1"
                            value="Answer 1"
                            checked={selectedAnswer === "Answer 1"}
                            onChange={handleSelectAnswer}
                        />
                        <RadioButton
                            label="Answer 2"
                            value="Answer 2"
                            checked={selectedAnswer === "Answer 2"}
                            onChange={handleSelectAnswer}
                        />
                        <RadioButton
                            label="Answer 3"
                            value="Answer 3"
                            checked={selectedAnswer === "Answer 3"}
                            onChange={handleSelectAnswer}
                        />
                        <RadioButton
                            label="Answer 4"
                            value="Answer 4"
                            checked={selectedAnswer === "Answer 4"}
                            onChange={handleSelectAnswer}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between gap-[50px] ">
                    <Button className="!h-[50px] bg-transparent border border-[--mainColor] !text-[--mainColor] rounded-[100px] w-full ">
                        Prev
                    </Button>
                    <Button className="!h-[50px] bg-[--mainColor] text-white rounded-[100px] w-full ">
                        Next
                    </Button>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
