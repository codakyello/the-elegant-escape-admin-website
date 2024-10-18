"use client";
import { Cabin } from "../utils/types";
import CabinRow from "./CabinRow";
import Menus from "./Menu";
import Table, { Body, Header } from "./Table";

export default function CabinTable({ cabins }: { cabins: Cabin[] }) {
  return (
    <Table columns={[".6fr", "1.8fr", "2.2fr", "1fr", "1fr", "1fr"]}>
      <Header headers={["", "cabin", "capacity", "price", "discount"]} />
      <Menus>
        <Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
        />
      </Menus>
    </Table>
  );
}
