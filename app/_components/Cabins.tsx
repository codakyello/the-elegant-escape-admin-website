import { getAllCabins } from "../_lib/data-service";
import Button from "./Button";
import CabinTable from "./CabinTable";
import ConfirmDelete from "./ConfirmDelete";
import CreateEditCabinForm from "./CreateEditCabinForm";
import CreateCabinForm from "./CreateEditCabinForm";
import Modal, { ModalOpen, ModalWindow } from "./Modal";

export default async function Cabins({
  searchParams,
}: {
  searchParams: { page: string; discount: string; sortBy: string };
}) {
  const data = await getAllCabins(searchParams);
  const count = data.totalCount;
  const cabins = data.cabins;

  return (
    <Modal>
      <CabinTable cabins={cabins} count={count} />

      <ModalOpen name="add-cabin">
        <Button type="primary">Add new cabin</Button>
      </ModalOpen>

      <ModalWindow name="add-cabin">
        <CreateEditCabinForm />
      </ModalWindow>
    </Modal>
  );
}
