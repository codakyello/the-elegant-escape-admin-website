"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";
import type { Filter } from "../utils/types";

export default function Filter({
  defaultValue,
  filters,
  paramName,
  className,
}: {
  defaultValue: string;
  filters: Filter[];
  paramName: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get(paramName) || defaultValue;
  console.log(activeFilter);
  const handleFilter = function (filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul
      className={`flex border border-[var(--color-grey-100)] gap-2 bg-[var(--color-grey-0)] shadow-sm p-[0.4rem] ${className}`}
    >
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          activeFilter={activeFilter}
          filter={filter}
          handleFilter={handleFilter}
        />
      ))}
    </ul>
  );
}
