"use client";
import React, { useState } from "react";
import { GoFilter } from "react-icons/go";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MoreFilter = ({ dahiracat }: { dahiracat: string[] }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearchChange = useDebouncedCallback((catSelected: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (catSelected) {
      params.set("dahiraname", catSelected);
    } else {
      params.delete("dahiraname");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);
  return (
    <div className="relative flex items-center gap-1 text-xs bg-transparent rounded py-[7px] px-4 cursor-pointer">
      <Select onValueChange={(value) => handleSearchChange(value)}>
        <SelectTrigger className="w-[180px] outline-none bg-[#111b21] text-white ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:border-none">
          {/* <GoFilter />
          Filter plus */}

          <SelectValue
            placeholder={
              <span className="flex items-center gap-2 text-gray-500">
                <GoFilter />
                Filtrer plus
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-[#111b21] text-gray-600">
          <SelectGroup>
            <SelectLabel>Dahiras</SelectLabel>
            <button
              className="text-sm mx-2 hover:opacity-60 transition-all ease-in-out duration-200"
              onClick={() => handleSearchChange("")}
            >
              Tous les dahiras
            </button>
            {dahiracat?.map((dahira, i) => (
              <SelectItem
                key={i + dahira}
                value={dahira}
                className="capitalize"
              >
                {dahira}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MoreFilter;
