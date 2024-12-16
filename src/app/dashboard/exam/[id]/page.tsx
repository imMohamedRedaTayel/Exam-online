"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./examSlice";
import { Store } from "@/types";
import Loading from "@/components/atoms/loading";
import Card from "./components/card";
import { useSession } from "next-auth/react";
import { setToken } from "@/app/appSlice";
import ExaSteps from "../(operations)/exaSteps";


type Props = {
    params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
    
    const { data: { exams }, loading, error } = useSelector((state: Store) => state.examSlice);
    const { data }: any = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        const unwrapParams = async () => {
            const { id } = await params;            
            if ( id && data?.token) {
                dispatch(setToken(data?.token));
                dispatch(fetchData(id));
            }
        };
        unwrapParams();
    }, [params, dispatch, data?.token]);

    // console.log(exams, "exams");

    return (
        <>
            <section className="flex flex-col gap-y-8">
                <div className="pt-[30px]">
                    {loading ? (
                        <div className=" w-full flex justify-center "> <Loading /> </div>
                    ) : error ? (
                        <div className="text-red-500">حدث خطأ أثناء تحميل البيانات</div>
                    ) : (
                        <>
                            {exams && exams.length > 0 ? (
                                <>
                                    <h2 className="text-[18px] font-[500] text-[#0F0F0F] mb-[24px]"> {exams?.[0]?.title || "Quiz"} </h2>

                                    <div className="flex flex-col gap-y-[30px]">
                                        {exams?.map((card: any) => (
                                            <Card
                                                key={card?._id}
                                                id={card?._id}
                                                title={card?.title}
                                                numberOfQuestions={card?.numberOfQuestions}
                                                duration={card?.duration}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-500"> There are no quizzes for this exam. </div>
                            )}
                        </>
                    )}
                </div>
                <ExaSteps />
            </section>
        </>
    );
};

export default Page;
