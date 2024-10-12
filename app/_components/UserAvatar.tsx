import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { cookies } from "next/headers";
import { getAdmin } from "../_lib/data-service";

export default async function UserAvatar() {
  const token = cookies().get("token")?.value;
  const user = await getAdmin(token);

  return (
    <Box className="flex items-center gap-5">
      <Box className="relative w-14 rounded-full overflow-hidden aspect-square">
        <Image fill alt="My Avatar" src={user.image || "/"} />
      </Box>
      <span className="text-[1.4rem] font-medium">demo</span>
    </Box>
  );
}
