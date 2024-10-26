import CabinTable from "@/app/_components/CabinTable";
import Sort from "@/app/_components/Sort";
import Filter from "@/app/_components/Filter";
import { getAllCabins } from "@/app/_lib/data-service";
import { Box } from "@chakra-ui/react";
import Button from "@/app/_components/Button";
import Modal, { ModalOpen, ModalWindow } from "@/app/_components/Modal";
import CreateEditCabinForm from "@/app/_components/CreateEditCabinForm";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import { Suspense } from "react";
import Cabins from "@/app/_components/Cabins";
import Loading from "../loading";

export const metadata = {
  title: "Cabins",
};

async function Page({
  searchParams,
}: {
  searchParams: { page: string; discount: string; sortBy: string };
}) {
  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex flex-col lg:flex-row gap-8 pt-1 pr-1">
        <h1 className="">All Cabins</h1>
        <Box className="flex gap-6 lg:ml-auto">
          <Filter
            defaultValue="all"
            paramName="discount"
            filters={[
              { name: "All", value: "all" },
              { name: "No discount", value: "no-discount" },
              { name: "With discount", value: "with-discount" },
            ]}
          />

          <Sort
            defaultValue="startDate-desc"
            options={[
              { name: "Sort by name (A-Z)", value: "name-asc" },
              { name: "Sort by name (Z-A)", value: "name-desc" },
              {
                name: "Sort by price (low first)",
                value: "regularPrice-asc",
              },
              {
                name: "Sort by price (high first)",
                value: "regularPrice-desc",
              },
              {
                name: "Sort by capacity (low first)",
                value: "maxCapacity-asc",
              },
              {
                name: "Sort by capacity (high first)",
                value: "maxCapacity-desc",
              },
            ]}
          />
        </Box>
      </Box>

      <Suspense
        fallback={<Loading />}
        key={`${searchParams.discount}-${searchParams.page}-${searchParams.sortBy}`}
      >
        <Cabins searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}

export default Page;
