
'use client';

import React from 'react';
import { Tv, Wifi, Wind, Droplet, Utensils, ParkingCircle, Sun, Mountain, Building, Check, Sofa, Wine, Lamp, Briefcase } from 'lucide-react';
import type { Facility } from '@/lib/types';

interface RoomFacilitiesProps {
  bedroomList: Facility[];
  bathList: Facility[];
  livingRoomList: Facility[];
  barList: Facility[];
  workSpaceList: Facility[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  '平面電視': <Tv className="w-5 h-5 mr-2" />,
  'Wifi': <Wifi className="w-5 h-5 mr-2" />,
  '空調': <Wind className="w-5 h-5 mr-2" />,
  '熱水': <Droplet className="w-5 h-5 mr-2" />,
  '廚房': <Utensils className="w-5 h-5 mr-2" />,
  '停車位': <ParkingCircle className="w-5 h-5 mr-2" />,
  '市景': <Building className="w-5 h-5 mr-2" />,
  '山景': <Mountain className="w-5 h-5 mr-2" />,
  '陽台': <Sun className="w-5 h-5 mr-2" />,
  '沙發': <Sofa className="w-5 h-5 mr-2" />,
  '酒吧': <Wine className="w-5 h-5 mr-2" />,
  '檯燈': <Lamp className="w-5 h-5 mr-2" />,
  '辦公區': <Briefcase className="w-5 h-5 mr-2" />,
};

const InfoSection = ({ title, items }: { title: string; items: Facility[] }) => {
  const providedItems = (items || []).filter(item => item.isProvide);
  if (providedItems.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="font-bold text-lg mb-3 text-steel-blue">{title}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {providedItems.map(item => (
          <div key={item.title} className="flex items-center text-steel-blue/90">
            {iconMap[item.title] || <Check className="w-5 h-5 mr-2 text-sky-blue" />}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoomFacilities = ({ bedroomList, bathList, livingRoomList, barList, workSpaceList }: RoomFacilitiesProps) => {
  return (
    <div className="border-t pt-8 mt-8">
        <h3 className="text-2xl font-bold mb-6 text-steel-blue">房間詳細資訊</h3>
        <InfoSection title="臥室" items={bedroomList} />
        <InfoSection title="浴室" items={bathList} />
        <InfoSection title="客廳" items={livingRoomList} />
        <InfoSection title="吧台" items={barList} />
        <InfoSection title="辦公區" items={workSpaceList} />
    </div>
  );
};

export default RoomFacilities;
