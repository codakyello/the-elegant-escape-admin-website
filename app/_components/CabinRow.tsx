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
import { ConfirmDelete } from "./ConfirmDelete";
import { useState } from "react";

// async function handleDelete(cabin: Cabin) {}

// const menuList = [
//   {
//     name: "Edit",
//     icon: (
//       <HiPencil className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
//     ),
//     onClick: () => {},
//   },
//   {
//     name: "Delete",
//     icon: (
//       <HiTrash className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
//     ),
//     onClick: () => {},
//   },
// ];

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const { close } = useModal();

  const handleUnAuthorisedResponse = useHandleUnAuthorisedResponse();

  const [loading, setLoading] = useState(false);

  const handleDuplicate = async function (cabin: Cabin) {
    const cabinData = {
      ...cabin,
      _id: undefined,
      name: `Copy of ${cabin.name}`,
    };

    const token = await getToken();

    const res = await createCabin(token, cabinData);

    showToastMessage(res.status, res.message, "Cabin successfully created");
  };

  const handleDelete = async function (id: string) {
    setLoading(true);

    const token = await getToken();

    const res = await deleteCabin(id, token);

    handleUnAuthorisedResponse(res.statusCode);

    showToastMessage(res.status, res.message, "Cabin successfully deleted");

    setLoading(false);

    close();
  };
  const { name, numGuests, image, regularPrice, discount, _id } = cabin;
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
      <p>Fits up to {numGuests} guests</p>
      <p className="font-semibold">{formatCurrency(regularPrice)}</p>
      <p className="text-[var(--color-green-700)] font-medium">
        {discount ? formatCurrency(discount) : "-"}
      </p>

      <div className="relative grid">
        <Menus.Toogle id={cabin._id}>
          <button className="bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 hover:bg-gray-100">
            <HiEllipsisVertical className="self-end h-10 w-10" />
          </button>
        </Menus.Toogle>

        <Menus.Menu id={cabin._id}>
          <Menus.Button
            onClick={() => handleDuplicate(cabin)}
            icon={
              <HiSquare2Stack className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
          >
            Duplicate
          </Menus.Button>

          <Menus.Button
            onClick={() => {}}
            icon={
              <HiPencil className="w-[1.6rem] h-[1.6rem] text-[var(--color-grey-400)]" />
            }
          >
            Edit
          </Menus.Button>

          <ModalOpen name="delete-cabin">
            <Menus.Button
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
              isLoading={loading}
              onConfirm={() => {
                handleDelete(_id);
              }}
              onClose={close}
            />
          </ModalWindow>
        </Menus.Menu>
      </div>
    </Row>
  );
}
