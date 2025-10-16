
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

interface EditGuestsModalProps {
  initialValue: number;
  maxValue: number;
  onSave: (newValue: number) => void;
  children: React.ReactNode;
}

export const EditGuestsModal = ({ initialValue, maxValue, onSave, children }: EditGuestsModalProps) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(initialValue);

  const handleSave = () => {
    onSave(count);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>修改入住人數</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex items-center justify-center gap-4">
            <Button variant="outline" onClick={() => setCount(Math.max(1, count - 1))}>-</Button>
            <Input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(Math.max(1, Math.min(maxValue, parseInt(e.target.value, 10) || 1)))} 
                className="w-24 text-center" 
            />
            <Button variant="outline" onClick={() => setCount(Math.min(maxValue, count + 1))}>+</Button>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>儲存變更</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
