import { Suspense } from 'react';
import { FilterClient } from './FilterClient';

export function Filter() {
  return (
    <Suspense fallback={<div className="h-[108px]">Loading filters...</div>}>
      <FilterClient />
    </Suspense>
  );
}