import { DateTime } from "luxon";
import Button from "@/components/atoms/button";
import Loading from "@/components/atoms/loading";
import RadioButton from "@/components/atoms/radioButton";
import { useState, useEffect } from "react";
import Score from "../score";
import Image from "next/image";

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
};

export const Modal = ({ isOpen, onClose, questions = [], loading, duration }: ModalProps) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
    const [showScore, setShowScore] = useState(false);
    const [loadingScore, setLoadingScore] = useState(false);

    // حالة لحفظ الوقت المتبقي
    const [timeRemaining, setTimeRemaining] = useState(duration); // 25 دقيقة بالثواني

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // تنظيف المؤقت عند الخروج
        return () => clearInterval(timer);
    }, [duration]); // إضافة dependency على duration في حال تغييره


    if (!isOpen || questions.length === 0) {
        return loading ? (
            <div className="flex justify-center items-center">
                <Loading />
            </div>
        ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px]">
                    <h2 className="text-[24px] font-[500]">لا يوجد امتحان الآن</h2>
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
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion._id]: answer,
        }));
    };

    // حساب الإجابات الصحيحة والخاطئة
    const calculateCorrectAnswers = () => {
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        questions.forEach((question) => {
            if (selectedAnswers[question._id] === question.correct) {
                correctAnswers += 1;
            } else if (selectedAnswers[question._id] !== null) {
                incorrectAnswers += 1;
            }
        });

        return { correctAnswers, incorrectAnswers };
    };

    // حساب النتيجة المئوية
    const calculateScore = () => {
        const { correctAnswers } = calculateCorrectAnswers();
        return Math.round((correctAnswers / questions.length) * 100);
    };

    // الانتقال للسؤال التالي أو عرض النتيجة
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setLoadingScore(true); // تفعيل شاشة التحميل
            setTimeout(() => {
                setShowScore(true);
                setLoadingScore(false); // إيقاف شاشة التحميل بعد فترة
            }, 2000); // مدة شاشة التحميل (2 ثانية)
        }
    };
    

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    // استخدام Luxon لتحويل الوقت المتبقي من ثواني إلى دقيقة:ثانية
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00"; // Prevent NaN from showing
        return DateTime.fromSeconds(seconds).toFormat('mm:ss');
    };

    const { correctAnswers, incorrectAnswers } = calculateCorrectAnswers();

    return (
        <>
            {showScore ? (
                loadingScore ? (
                    <div className="flex justify-center items-center z-50 w-full h-screen bg-red-400  ">
                        <Loading />
                    </div>
                ) : (
                    <Score score={calculateScore()} correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />
                )

            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

                            <div className="mt-6 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
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
