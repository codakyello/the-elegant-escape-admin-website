import { UpdateUser } from "@/app/_components/UpdateUserForm";
import { Box } from "@chakra-ui/react";

export const metadata = {
  title: "Account",
};

async function Page() {
  return (
    <Box className="flex flex-col gap-[2rem] md:gap-[3.2rem]">
      <h1>Update your account</h1>
      <h2>Update user data</h2>

      <UpdateUser />
    </Box>
  );
}

export default Page;
