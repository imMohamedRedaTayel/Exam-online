import Button from '@/components/atoms/button';
import Image from 'next/image';
import React from 'react';

type Props = {};

const quizzes = [
  {
    title: 'HTML',
    questions: '20 Questions',
    duration: '15 Minutes',
    imageSrc: '/asstes/quiz/skill-icons_html.png',
  },
  {
    title: 'CSS',
    questions: '25 Questions',
    duration: '20 Minutes',
    imageSrc: '/asstes/quiz/skill-icons_html.png',
  },
];

const FrameworkQuiz = (props: Props) => {
  return (
    <div className="pt-[30px]">
      <h2 className="text-[18px] font-[500] text-[#0F0F0F] mb-[24px] ">Framework Quiz</h2>

      <div className="flex flex-col gap-y-[30px]">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-white py-[16px] px-[24px] flex items-center justify-between rounded-[10px] shadow-lg"
          >
            <div className="flex items-center gap-x-[24px]">
              <Image
                src={quiz.imageSrc}
                width={70}
                height={70}
                className=""
                alt={`${quiz.title} icon`}
              />
              <div>
                <p className="text-[16px] font-[500] text-[#0F0F0F]">{quiz.title}</p>
                <p className="text-[13px] font-[400] text-[#535353]">{quiz.questions}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-[12px]">
              <p className="text-[13px] font-[400] text-[#0F0F0F]">{quiz.duration}</p>
              <Button className="py-[4px] px-[24px] h-[23px] text-[12px] font-[500] leading-tight">
                Start
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworkQuiz;
