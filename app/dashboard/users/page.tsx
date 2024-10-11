import { Box } from "@chakra-ui/react";
import SignUpForm from "@/app/_components/SignUpForm";
export default function Page() {
  return (
    <Box className="flex flex-col gap-[3.2rem]">
      <h1>Create a new user</h1>
      <SignUpForm />
    </Box>
  );
}
