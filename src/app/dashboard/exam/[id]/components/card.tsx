import Button from "@/components/atoms/button";
import Modle from "@/components/atoms/modle";
import React, { useState } from "react";

type CardProps = {
    id: string;
    title: string;
    duration: any;
    numberOfQuestions: number
};

const Card = ({ id, title, numberOfQuestions, duration }: CardProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            key={id}
            className="bg-white py-[16px] px-[24px] flex items-center justify-between rounded-[10px] shadow-lg"
        >
            <div className="flex items-center gap-x-[24px]">
                {/* <Image
                    src={quiz.imageSrc}
                    width={70}
                    height={70}
                    className=""
                    alt={`${quiz.title} icon`}
                /> */}
                <div>
                    <p className="text-[16px] font-[500] text-[#0F0F0F]">{title}</p>
                    <p className="text-[13px] font-[400] text-[#535353]">{numberOfQuestions} Question </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-[12px]">
                <p className="text-[13px] font-[400] text-[#0F0F0F]">{duration} minutes </p>
                <Button
                    onClick={handleOpenModal}
                    className="!py-[4px] !px-[24px] !h-[23px] !text-[12px] !font-[500] !leading-tight">
                    Start
                </Button>
            </div>

            {isModalOpen && (
                <Modle
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}

        </div>
    );
};

export default Card;
