import Image from 'next/image';
import React from 'react';

type Props = {};

const Quizes = (props: Props) => {

    const cards = [
        {
            id: 1,
            title: 'Front-end Web Development',
            description: 'Voluptatem aut ut dignissimos blanditiis',
            image: '/asstes/dashboard/compouter.png',
        },
        {
            id: 2,
            title: 'Back-end Web Development',
            description: 'Eum saepe aliquid obcaecati voluptate',
            image: '/asstes/dashboard/compouter.png',
        },
        {
            id: 3,
            title: 'Full-stack Development',
            description: 'Alias fuga sit ullam laboriosam tenetur',
            image: '/asstes/dashboard/compouter.png',
        },
        {
            id: 4,
            title: 'UI/UX Design',
            description: 'Quasi eveniet quibusdam doloremque labore',
            image: '/asstes/dashboard/compouter.png',
        },
        {
            id: 5,
            title: 'Mobile App Development',
            description: 'Culpa tempore nesciunt nobis ipsa',
            image: '/asstes/dashboard/compouter.png',
        },
        {
            id: 6,
            title: 'Game Development',
            description: 'Itaque maiores hic mollitia similique',
            image: '/asstes/dashboard/compouter.png',
        },
    ];

    return (
        <div>
            <div className="w-full bg-white shadow-lg rounded-[20px] py-[32px] px-[16px]">
                <div className="flex flex-wrap items-center justify-between">
                    <h2 className="text-[24px] font-[500] text-[--mainColor]">Quizes</h2>
                    <h2 className="text-[24px] font-[500] text-[--mainColor] cursor-pointer">
                        View All
                    </h2>
                </div>
                <div className="mt-[24px] flex flex-wrap ">
                    {cards.map((card) => (
                        <div key={card.id} className="w-full md:w-4/12">
                            <div className="relative px-[16px] mb-[24px] ">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-auto"
                                />
                                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[20px] p-3 w-[80%] rounded-[10px] bg-[#1935CA66] backdrop-blur-sm">
                                    <h4 className="text-[13px] font-[700] text-white">
                                        {card.title}
                                    </h4>
                                    <p className="text-[11px] font-[500] text-white">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quizes;
