"use client"
import Button from '@/components/atoms/button';
import SearchInput from '@/components/molecules/searchInput';
import React, { useState } from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '@/app/appSlice';
import { Store } from '@/types';

type Props = {}

const Header = (props: Props) => {

    const { showSideBar } = useSelector((store: Store) => store.appSlice);

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleMenuClick = () => {        
        dispatch(toggleSideBar(!showSideBar)); // عند الضغط على الأيقونة يظهر الشريط الجانبي
    };


    return (
        <>
            <section className='Header'>
                <div className='h-20 w-full flex justify-between items-center px-4 z-10 bg-[--mainColor] md:bg-transparent '>
                    <div className="flex flex-wrap items-center w-full  ">

                        <div className="flex items-center justify-start w-6/12  gap-x-[24px] md:hidden">
                            <RiMenu2Line size={24} className="text-white" onClick={handleMenuClick} />
                            <IoIosSearch size={24} className="text-white" />
                        </div>

                        <div className='w-9/12 hidden md:block'>
                            <div className='pr-[24px]'>
                                <SearchInput
                                    placeholder="Search Quiz..."
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

             
                        <div className='w-6/12 md:w-3/12   '>
                            <div className='flex items-center justify-end gap-x-[24px]'>
                                <div className='w-9/12 hidden md:block '>
                                    <Button className='w-full font-[700]'>Start Quiz</Button>
                                </div>
                                <div className='flex items-center justify-center w-3/12   '>
                                    <div className='flex items-center justify-center md:w-[56px] md:h-[56px] w-[40px] h-[40px] bg-red-400 overflow-hidden rounded-full'>
                                        <img
                                            src={'/asstes/moReda.jpg'}
                                            alt='image'
                                            className='object-contain w-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Header;
