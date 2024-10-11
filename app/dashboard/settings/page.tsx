import UpdateSettingsForm from "@/app/_components/UpdateSettingsForm";
import { getSettings } from "@/app/_lib/data-service";
import { Box } from "@chakra-ui/react";

export const metadata = {
  title: "Update hotel setting",
};
async function Page() {
  const settings = await getSettings();

  if (!settings) return null;
  return (
    <Box className="flex flex-col gap-[2.8rem]">
      <h1>Update hotel settings</h1>
      <UpdateSettingsForm settings={settings} />
    </Box>
  );
}

export default Page;
