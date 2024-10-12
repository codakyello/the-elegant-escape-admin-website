"use client";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "../_contexts/AuthProvider";

export default function UserAvatar() {
  const { user } = useAuth();
  return (
    <Box className="flex items-center gap-5">
      <Box className="relative w-14 rounded-full overflow-hidden aspect-square">
        <Image fill alt="My Avatar" src={user?.image || "/"} />
      </Box>
      <span className="text-[1.4rem] font-medium">demo</span>
    </Box>
  );
}
