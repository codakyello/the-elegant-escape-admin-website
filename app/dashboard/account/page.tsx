import UpdateUserForm from "@/app/_components/UpdateUserForm";
import UpdatePasswordForm from "@/app/_components/UpdatePasswordForm";
import { Box } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { getAdmin } from "@/app/_lib/data-service";

export const metadata = {
  title: "Account",
};

async function Page() {
  const token = cookies().get("token")?.value;
  const user = await getAdmin(token);
  console.log(token, user);
  return (
    <Box className="flex flex-col gap-[2rem] md:gap-[3.2rem]">
      <h1>Update your account</h1>

      <h2>Update user data</h2>
      <UpdateUserForm user={user} />

      <h2>Update password</h2>
      <UpdatePasswordForm />
    </Box>
  );
}

export default Page;
