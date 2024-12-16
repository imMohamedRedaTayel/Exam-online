import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { Store } from '@/types';
import { CustomRadioButton } from '@/components/atoms/CustomRadioButton';

type Props = {};

const Results = (props: Props) => {
    // State to handle modal visibility
    const [isModalOpen, setIsModalOpen] = useState(true);
    const { incorrectQuestions } = useSelector((state: Store) => state.exaStepsSlice);

    if (!isModalOpen) return null; // Don't render the modal if it's closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[776px]">
                <h2 className="text-xl font-semibold mb-4">Incorrect Questions</h2>

                {/* Container with scroll */}
                <div
                    className="overflow-y-auto flex flex-wrap items-start"
                    style={{ maxHeight: '400px' }}
                >
                    {incorrectQuestions.map((questionData: any) => (
                        <div key={questionData._id} className="p-4 rounded-lg w-6/12">
                            <div className="p-4 rounded-lg bg-gray-100">
                                <h3 className="font-medium text-lg mb-2">{questionData.question}</h3>
                                <div className="space-y-2">
                                    {questionData.answers.map((answer: any) => (
                                        <CustomRadioButton
                                            key={answer.key}
                                            label={answer.answer}
                                            value={answer.key}
                                            isCorrect={questionData.correct === answer.key}
                                            isSelected={answer.key === questionData.selected}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-between">
                    <Button
                        className="!h-[50px] bg-[--mainColor] text-white rounded-[100px] w-full"
                        onClick={() => setIsModalOpen(false)} // Close the modal
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Results;
