"use client";
import { setToken } from '@/app/appSlice';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchMoreData } from './quizesSlice';
import { Store } from '@/types';
import Card from './components/card';
import Loading from '@/components/atoms/loading';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {};

const Quizes = (props: Props) => {
    
    const dispatch = useDispatch();
    const { data }: any = useSession();
    const { data: subjects, loading, error, nextPage , isLoadingMore } = useSelector((state: Store) => state.quizesSlice);

    useEffect(() => {
        if (data?.token) {
            dispatch(setToken(data?.token));
            dispatch(fetchData());
        }
    }, [dispatch, data?.token]);

    return (
        <div>
                <div className="w-full bg-white shadow-lg rounded-[20px] py-[32px] px-[16px] mb-3 flex items-center justify-center flex-col">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-red-500">حدث خطأ أثناء تحميل البيانات</div>
                ) : (
                    <>
                        <div className="flex flex-wrap items-center justify-between">
                            <h2 className="text-[24px] font-[500] text-[--mainColor]">Quizes</h2>
                        </div>
                        <div
                            id="scrollableDiv"
                            className="mt-[24px] flex flex-wrap overflow-y-auto"
                            style={{
                                maxHeight: '300px',
                                minHeight: '300px',
                            }}
                        >
                            <InfiniteScroll
                                dataLength={subjects?.length || 0}
                                next={() => {
                                    if (nextPage && !loading && !isLoadingMore) {
                                        dispatch(fetchMoreData());
                                    }
                                }}
                                hasMore={nextPage}
                                loader={null}
                                scrollThreshold={0.9}
                                scrollableTarget="scrollableDiv"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                {subjects?.map((card: any) => (
                                    <Card key={card?._id} id={card?._id} icon={card?.icon} name={card?.name} />
                                ))}
                                {isLoadingMore && (
                                    <div className="w-full flex justify-center py-4">
                                        <Loading />
                                    </div>
                                )}
                            </InfiniteScroll>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default Quizes;
