import Button from "@/components/atoms/button";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleModel } from "../../(operations)/exaSteps/exaStepsSlice";

type CardProps = {
    id: string;
    title: string;
    duration: any;
    numberOfQuestions: number
};

const Card = ({ id, title, numberOfQuestions, duration }: CardProps) => {

    console.log(id);
    
    const dispatch = useDispatch()
    const openModal = () => {
        dispatch(toggleModel(id));
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
                    onClick={openModal}
                    className="!py-[4px] !px-[24px] !h-[23px] !text-[12px] !font-[500] !leading-tight">
                    Start
                </Button>
            </div>

        </div>
    );
};

export default Card;
