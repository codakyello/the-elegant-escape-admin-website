import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function UserAvatar() {
  return (
    <Box className="flex items-center gap-5">
      <Box className="relative w-14 rounded-full overflow-hidden aspect-square">
        <Image
          fill
          alt="My Avatar"
          src="https://asvhruseebznfswjyxmx.supabase.co/storage/v1/object/public/user-avatars/avatar.png"
        />
      </Box>
      <span className="text-[1.4rem] font-medium">demo</span>
    </Box>
  );
}
