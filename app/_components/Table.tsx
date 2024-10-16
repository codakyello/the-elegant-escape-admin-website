"use client";
import { Box } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";
// import { Booking, Cabin } from "../utils/types";
import { generateGridTemplateColumns } from "../utils/helpers";

type TableContextType = { columns: string[] } | undefined;

const TableContext = createContext<TableContextType>(undefined);

export default function Table({
  columns,
  children,
}: {
  columns: string[];
  children: ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <Box className="border border-[var(--color-grey-200)] bg-[var(--color-grey-0)] text-[1.4rem]">
        {children}
      </Box>
    </TableContext.Provider>
  );
}

export function useTable() {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("Cannot use table context outside its provider");

  return context;
}

export function Header({ headers }: { headers: string[] }) {
  const { columns } = useTable();

  return (
    <header
      style={{
        display: "grid",
        gridTemplateColumns: generateGridTemplateColumns(columns),
      }}
      className="gap-[2.4rem] py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-50)] border-b-[var(--color-grey-100)]"
    >
      {headers.map((header) => (
        <div key={header} className="uppercase font-semibold">
          {header}
        </div>
      ))}
    </header>
  );
}

export function Body<T>({
  data,
  render,
}: {
  data: T[];
  render: (item: T) => ReactNode;
}) {
  return <Box>{data.map(render)}</Box>;
}
