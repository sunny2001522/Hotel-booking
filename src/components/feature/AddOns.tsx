"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { AddOn } from "@/lib/types";
import Link from "next/link";

interface AddOnsProps {
  addOnsList: AddOn[];
  selectedAddOns: { [key: string]: number };
  onAddOnChange: (id: string, quantity: number) => void;
}

const AddOns = ({ addOnsList, selectedAddOns, onAddOnChange }: AddOnsProps) => {
  if (!addOnsList || addOnsList.length === 0) return null;

  return (
    <div className="border-t pt-8 mt-8">
      <h3 className="text-2xl font-bold mb-6 text-steel-blue">加購服務</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addOnsList.map((item) => {
          const quantity = selectedAddOns[item._id] || 0;
          if (
            item.title !== "共程接送" &&
            item.title !== "禮車接送" &&
            item.title !== "租車服務"
          ) {
            return (
              <div
                key={item._id}
                className="bg-white/50 rounded-lg shadow-sm p-4 flex items-center gap-4"
              >
                <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-ice-blue">
                    NT$ {item.price.toLocaleString()}{" "}
                  </p>
                </div>
                {item.num === 0 && item.title !== "共乘接送" ? (
                  <Link href="/rooms">
                    <Button className="shrink-0">升級房型</Button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onAddOnChange(item._id, Math.max(0, quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onAddOnChange(
                          item._id,
                          Math.min(item.num, quantity + 1)
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AddOns;
