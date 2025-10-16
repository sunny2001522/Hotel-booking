"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Checkbox } from "@/components/ui/checkbox";
import { DateRange } from "react-day-picker";
import { addDays, format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Users, DollarSign } from "lucide-react";

export const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    return {
      from: checkIn ? parseISO(checkIn) : new Date(),
      to: checkOut ? parseISO(checkOut) : addDays(new Date(), 2),
    };
  });
  const [peopleNum, setPeopleNum] = useState(() =>
    parseInt(searchParams.get("people") || "2", 10)
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  // const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
  //   () => searchParams.get("facilities")?.split(",") || []
  // );
  // const [selectedAddOns, setSelectedAddOns] = useState<string[]>(
  //   () => searchParams.get("addOns")?.split(",") || []
  // );

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (date?.from) query.append("checkIn", date.from.toISOString());
    if (date?.to) query.append("checkOut", date.to.toISOString());
    query.append("people", peopleNum.toString());
    if (priceRange.min) query.append("minPrice", priceRange.min);
    if (priceRange.max) query.append("maxPrice", priceRange.max);
    // if (selectedFacilities.length > 0)
    //   query.append("facilities", selectedFacilities.join(","));
    // if (selectedAddOns.length > 0)
    //   query.append("addOns", selectedAddOns.join(","));

    router.push(`/rooms?${query.toString()}`);
  };

  // const renderSelectedText = (items: string[], defaultText: string) => {
  //   if (items.length === 0) return defaultText;
  //   if (items.length <= 2) return items.join(", ");
  //   return `${items.length} 項已選`;
  // };

  return (
    <div className="md:sticky top-20 z-40 font-serif  flex flex-col items-center gap-2">
      
      <div className="flex flex-col md:flex-row justify-center items-center bg-white/20 border rounded-lg backdrop-blur-lg shadow-lg md:rounded-full p-4 mx-10 gap-4 text-center left-0 right-0">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="glass"
              className="w-full md:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "MM/dd")} - {format(date.to, "MM/dd")}
                  </>
                ) : (
                  format(date.from, "MM/dd")
                )
              ) : (
                <span>選擇日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* People Count */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <Input
            type="number"
            value={peopleNum}
            onChange={(e) => setPeopleNum(parseInt(e.target.value, 10) || 1)}
            className="w-16"
            min="1"
          />
        </div>

        {/* Price Range */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="glass">
              <DollarSign className="mr-2 h-4 w-4" />
              價格範圍
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="最低價"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="最高價"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Facilities */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {renderSelectedText(selectedFacilities, "設施")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid grid-cols-2 gap-2">
              {facilityOptions.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fac-${opt}`}
                    checked={selectedFacilities.includes(opt)}
                    onCheckedChange={(checked) => {
                      setSelectedFacilities((prev) =>
                        checked ? [...prev, opt] : prev.filter((f) => f !== opt)
                      );
                    }}
                  />
                  <label htmlFor={`fac-${opt}`}>{opt}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover> */}

        {/* Add-ons */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {renderSelectedText(selectedAddOns, "加值服務")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid grid-cols-2 gap-2">
              {addOnOptions.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <Checkbox
                    id={`add-${opt}`}
                    checked={selectedAddOns.includes(opt)}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns((prev) =>
                        checked ? [...prev, opt] : prev.filter((a) => a !== opt)
                      );
                    }}
                  />
                  <label htmlFor={`add-${opt}`}>{opt}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover> */}

        <Button onClick={handleSearch}>搜尋</Button>
      </div>
    </div>
  );
};
