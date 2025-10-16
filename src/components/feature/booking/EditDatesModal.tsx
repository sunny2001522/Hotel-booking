
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { DateRange } from 'react-day-picker';

interface EditDatesModalProps {
  initialDateRange: DateRange;
  onSave: (newDateRange: DateRange) => void;
  children: React.ReactNode;
}

export const EditDatesModal = ({ initialDateRange, onSave, children }: EditDatesModalProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);

  const handleSave = () => {
    if (date) {
      onSave(date);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>選擇新的日期</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>儲存變更</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
