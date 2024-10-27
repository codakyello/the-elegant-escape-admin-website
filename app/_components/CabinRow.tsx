"use client";
import { Box } from "@chakra-ui/react";
import Row from "./Row";
import Image from "next/image";
import { formatCurrency } from "../utils/helpers";
import { Cabin } from "../utils/types";
import Menus from "./Menu";
import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import { getToken } from "../utils/serverUtils";
import { createCabin, deleteCabin } from "../_lib/data-service";
import {
  showToastMessage,
  useHandleUnAuthorisedResponse,
} from "../utils/utils";
import { ModalOpen, ModalWindow, useModal } from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useState } from "react";
import CreateEditCabinForm from "./CreateEditCabinForm";

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const { close } = useModal();

  const { name, maxCapacity, image, regularPrice, discount, _id: id } = cabin;

  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const [loading, setLoading] = useState(false);

  const handleDuplicate = async function (cabin: Cabin) {
    setLoading(true);

    const cabinData = {
      ...cabin,
      _id: undefined,
      name: `Copy of ${cabin.name}`,
    };

    const token = await getToken();

    const res = await createCabin(token, cabinData);

    showToastMessage(res.status, res.message, "Cabin successfully created");

    setLoading(false);

    close();
  };

  const handleDelete = async function () {
    setLoading(true);

    const token = await getToken();

    const res = await deleteCabin(id, token);

    handleUnAuthorisedResponse(res.statusCode);

    showToastMessage(res.status, res.message, "Cabin successfully deleted");

    setLoading(false);

    close();
  };
  return (
    <Row>
      <Box className="relative w-[6.4rem] aspect-[3/2]">
        <Image
          className="scale-150 translate-x-[-7px]"
          fill
          src={image}
          alt="cabin-img"
        />
      </Box>
      <p className="font-semibold">{name}</p>
      <p>Fits up to {maxCapacity} guests</p>
      <p className="font-semibold">{formatCurrency(regularPrice)}</p>
      <p className="text-[var(--color-green-700)] font-medium">
        {discount ? formatCurrency(discount) : "-"}
      </p>

      <div className="relative grid">
        <Menus.Toogle id={id}>
          <button className="bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 hover:bg-gray-100">
            <HiEllipsisVertical className="self-end h-10 w-10" />
          </button>
        </Menus.Toogle>

        <Menus.Menu id={cabin._id}>
          <Menus.Button
            disabled={loading}
            onClick={() => handleDuplicate(cabin)}
            icon={
              <HiSquare2Stack className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
          >
            Duplicate
          </Menus.Button>

          <ModalOpen name="edit-cabin">
            <Menus.Button
              disabled={loading}
              onClick={() => {}}
              icon={
                <HiPencil className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
              }
            >
              Edit
            </Menus.Button>
          </ModalOpen>

          <ModalWindow name="edit-cabin">
            <CreateEditCabinForm cabinToEdit={cabin} />
          </ModalWindow>

          <ModalOpen name="delete-cabin">
            <Menus.Button
              disabled={loading}
              onClick={() => {}}
              icon={
                <HiTrash className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
              }
            >
              Delete
            </Menus.Button>
          </ModalOpen>

          <ModalWindow name="delete-cabin">
            <ConfirmDelete
              resourceName="Cabin"
              isDeleting={loading}
              onConfirm={handleDelete}
              onClose={close}
            />
          </ModalWindow>
        </Menus.Menu>
      </div>
    </Row>
  );
}
