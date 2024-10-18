import CabinTable from "@/app/_components/CabinTable";
import Sort from "@/app/_components/Sort";
import Filter from "@/app/_components/Filter";
import { getCabins } from "@/app/_lib/data-service";
import { Box } from "@chakra-ui/react";
import Button from "@/app/_components/Button";
import Modal, { ModalOpen, ModalWindow } from "@/app/_components/Modal";
// import { ConfirmDelete } from "@/app/_components/ConfirmDelete";

export const metadata = {
  title: "Cabins",
};

async function Page() {
  const cabins = await getCabins();
  return (
    <Modal>
      <Box className="flex flex-col gap-5">
        <Box className="grid-cols-[1fr_1fr] grid lg:grid-cols-[repeat(3,auto)] gap-8">
          <h1 className="col-span-2 lg:col-span-1 ">All Cabins</h1>
          <Filter
            defaultValue="all"
            paramName="discount"
            className="lg:ml-auto"
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
              { name: "Sort by price (low first)", value: "regularPrice-asc" },
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

        <CabinTable cabins={cabins} />

        <ModalOpen name="add-cabin">
          <Button type="primary">Add new cabin</Button>
        </ModalOpen>

        <ModalWindow name="add-cabin">
          <span></span>
          {/* <ConfirmDelete
          isLoading={loading}
            resourceName="Cabin"
            onConfirm={() => {}}
            onClose={() => {}}
          /> */}
        </ModalWindow>
      </Box>
    </Modal>
  );
}

export default Page;
