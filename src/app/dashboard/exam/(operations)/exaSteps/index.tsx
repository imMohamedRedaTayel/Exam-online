"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/types";
import { useSession } from "next-auth/react";
import { fetchData, toggleModel } from "./exaStepsSlice";
import { setToken } from "@/app/appSlice";
import { Modal } from "@/components/molecules/Modal";

const ExaSteps = () => {
    const dispatch = useDispatch();
    const {
        data: { questions },
        loading,
        error,
        showModel,
        selectedExamId,
        currentQuestionIndex,
        selectedAnswers
    } = useSelector((state: Store) => state.exaStepsSlice);

    const { data }: any = useSession();

    // Close modal handler
    const closeModal = () => {
        dispatch(toggleModel(null));
    };

    // Set token on session change
    useEffect(() => {
        if (data?.token) {
            dispatch(setToken(data?.token));
        }
    }, [dispatch, data?.token]);

    // Fetch data when selectedExamId changes
    useEffect(() => {
        if (selectedExamId) {
            // console.log( selectedExamId , 'selectedExamIdselectedExamIdselectedExamId' );
            dispatch(fetchData());
        }
    }, [dispatch, selectedExamId]);

    // console.log(questions, "Exam Data");

    const examDuration = questions?.[0]?.exam?.duration * 60;


    return (
        <div>
            {showModel &&
                <Modal
                    isOpen={showModel}
                    onClose={closeModal}
                    questions={questions}
                    loading={loading}
                    duration={examDuration}
                    currentQuestionIndex={currentQuestionIndex}
                    selectedAnswers={selectedAnswers}
                />
            }
        </div>
    );
};

export default ExaSteps;
