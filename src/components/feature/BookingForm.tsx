
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

const BookingForm = () => {
  return (
    <form className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full md:w-auto">
        <div className='md:flex justify-center items-center backdrop-blur-sm bg-white/30 p-4 md:rounded-lg gap-8 text-center'>
            <div className="flex flex-col gap-2 border-r pr-8 cursor-pointer">
                <p>入住日期</p>
                <p className="date text-primary text-2xl font-bold">9/15-9/20</p>
            </div>
            <div className="flex flex-col gap-2 border-r pr-8 cursor-pointer">
                <p>入住人數</p>
                <div className="manNum flex justify-center items-center gap-4">
                    <Button variant="outline" className='rounded-full'>-</Button>
                    <p className="text-2xl text-primary font-bold">1人</p>
                    <Button variant="outline" className='rounded-full'>+</Button>
                </div>
            </div>
            <div className="flex flex-col gap-2 border-r pr-8 cursor-pointer">
                <p>房間數量</p>
                <div className="roomNum flex justify-center items-center gap-4">
                    <Button variant="outline" className='rounded-full'>-</Button>
                    <p className="text-2xl text-primary font-bold">1房</p>
                    <Button variant="outline" className='rounded-full'>+</Button>
                </div>
            </div>
            <Button className='mt-4 md:mt-0'>立即預約</Button>
        </div>
    </form>
  );
};

export default BookingForm;
