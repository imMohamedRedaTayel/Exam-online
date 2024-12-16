import { DateTime } from "luxon";
import Button from "@/components/atoms/button";
import Loading from "@/components/atoms/loading";
import RadioButton from "@/components/atoms/radioButton";
import { useState, useEffect } from "react";
import Score from "../score";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { calculateResults, setCurrentQuestionIndex, setLoadingScore, setSelectedAnswerForQuestion, setShowScore, setTimeRemaining } from "@/app/dashboard/exam/(operations)/exaSteps/exaStepsSlice";
import { Store } from "@/types";

type Answer = {
    answer: string;
    key: string;
};

type Question = {
    question: string;
    answers: Answer[];
    correct: string;
    _id: string;
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    loading: boolean;
    duration: number;
    currentQuestionIndex: number,
    selectedAnswers: any
};

export const Modal = ({ isOpen, onClose, questions = [], loading, duration, currentQuestionIndex, selectedAnswers }: ModalProps) => {

    const { showScore, timeRemaining, loadingScore, correctAnswers, incorrectAnswers, score } = useSelector((state: Store) => state.exaStepsSlice);
    const dispatch = useDispatch();

    // تعيين timeRemaining بناءً على duration عندما يتغير
    useEffect(() => {
        if (isOpen && duration > 0) {
            dispatch(setTimeRemaining(duration)); // تحويل الدقائق إلى ثواني وتعيين الوقت المتبقي
        }
    }, [isOpen, duration, dispatch]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timer);
                onClose(); // إغلاق الـ Modal عندما ينتهي الوقت
            } else {
                dispatch(setTimeRemaining(timeRemaining - 1));
            }
        }, 1000);

        return () => clearInterval(timer); // تنظيف التايمر عند إغلاق الـ Modal أو تغيير القيم
    }, [timeRemaining, dispatch, onClose]);


    // حساب الإجابات الصحيحة والخاطئة وتعيين النتيجة في Redux عند تغير الأسئلة أو الإجابات
    useEffect(() => {
        if (questions.length > 0 && Object.keys(selectedAnswers).length > 0) {
            dispatch(calculateResults({ questions }));
        }
    }, [questions, selectedAnswers, dispatch]);


    if (!isOpen || questions.length === 0) {
        return loading ? (
            <div className="flex justify-center items-center">
                <Loading />
            </div>
        ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px] flex justify-center items-center flex-col ">
                    <h2 className="text-[24px] font-[500]"> There is no exam now </h2>
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
    }

    const currentQuestion = questions[currentQuestionIndex];

    // دالة لاختيار الإجابة
    const handleSelectAnswer = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        // تحديث selectedAnswers في الـ Redux عند تحديد إجابة
        dispatch(setSelectedAnswerForQuestion({ questionId: currentQuestion._id, answer }));
    };

    // الانتقال للسؤال التالي أو عرض النتيجة
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
            dispatch(setLoadingScore(true)); // تفعيل شاشة التحميل
            setTimeout(() => {
                dispatch(setShowScore(true)); // إظهار النتيجة
                dispatch(setLoadingScore(false)); // إيقاف شاشة التحميل بعد 2 ثانية
            }, 2000); // مدة شاشة التحميل (2 ثانية)
        }
    };


    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
        }
    };

    // استخدام Luxon لتحويل الوقت المتبقي من ثواني إلى دقيقة:ثانية
    const formatTime = (seconds: number): string => {
        if (isNaN(seconds) || seconds < 0) return "0:00"; // منع NaN أو القيم السلبية
        return DateTime.fromSeconds(seconds).toFormat('mm:ss');
    };


    return (
        <>
            {showScore ? (
                !loadingScore ? (
                    <Score
                        score={score}
                        correctAnswers={correctAnswers}
                        incorrectAnswers={incorrectAnswers}
                    />
                ) : (
                    <div className="flex justify-center items-center z-50 w-full">
                        <Loading />
                    </div>
                )

            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                    {!loading ? <>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[14px] font-[500] text-[--mainColor]">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </h2>
                                <div className="flex items-center gap-[3px]">
                                    <Image
                                        src={'/asstes/exams/clock.png'}
                                        alt="clock"
                                        width={24}
                                        height={30}
                                    />
                                    <span className="text-[20px] font-[400] text-[#11CE19]">
                                        {formatTime(timeRemaining)}
                                    </span>
                                </div>
                            </div>

                            <div className="py-[24px]">
                                <h2 className="text-[24px] font-[500]">{currentQuestion.question}</h2>
                            </div>

                            <div>
                                <div className="flex flex-col gap-[16px]">
                                    {currentQuestion?.answers?.map((answer) => (
                                        <RadioButton
                                            key={answer.key}
                                            label={answer.answer}
                                            value={answer.key}
                                            checked={selectedAnswers[currentQuestion._id] === answer.key}
                                            onChange={() => handleSelectAnswer(answer.key)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between gap-[50px]">
                                <Button
                                    className="!h-[50px] bg-transparent border border-[--mainColor] !text-[--mainColor] rounded-[100px] w-full"
                                    onClick={handlePrev}
                                    disabled={currentQuestionIndex === 0 || loading}
                                >
                                    Prev
                                </Button>
                                <Button
                                    className="!h-[50px] bg-[--mainColor] text-white rounded-[100px] w-full"
                                    onClick={handleNext}
                                    disabled={!selectedAnswers[currentQuestion._id] || loading}
                                >
                                    {currentQuestionIndex === questions.length - 1 ? 'Done' : 'Next'}
                                </Button>
                            </div>

                            {/* <div className="mt-6 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div> */}
                        </div>

                    </> : <>
                        <div className="flex justify-center items-center">
                            <Loading />
                        </div>
                    </>}
                </div>
            )}
        </>
    );
};
