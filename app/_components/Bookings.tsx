import { getAllBookings } from "../_lib/data-service";
import { getToken } from "../utils/serverUtils";
import BookingTable from "./BookingTable";
import Button from "./Button";
import CreateEditCabinForm from "./CreateEditCabinForm";
import Modal, { ModalOpen, ModalWindow } from "./Modal";

export default async function Bookings({
  searchParams,
}: {
  searchParams: { page: string; status: string; sortBy: string };
}) {
  const token = await getToken();
  const data = await getAllBookings(token, searchParams);
  const bookings = data.bookings;
  const count = data.totalCount;

  return bookings.length ? (
    <Modal>
      <BookingTable count={count} bookings={bookings} />
      <ModalOpen name="add-cabin">
        <Button type="primary">Add new cabin</Button>
      </ModalOpen>

      <ModalWindow name="add-cabin">
        <CreateEditCabinForm />
      </ModalWindow>
    </Modal>
  ) : (
    <h1 className="mt-5">No Bookings Found</h1>
  );
}
