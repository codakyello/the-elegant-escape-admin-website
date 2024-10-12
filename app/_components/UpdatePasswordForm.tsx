import { Box } from "@chakra-ui/react";
import Button from "./Button";
import FormRow from "./FormRow";
import Input from "./Input";
import { useState } from "react";

export function UpdatePasswordForm() {
  const [loading, setLoading] = useState();

  function handleSubmit() {}
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-[2.4rem] px-[4rem] bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] text-[1.4rem] rounded-[var(--border-radius-md)]"
    >
      <FormRow
        orientation="horizontal"
        label="Email address"
        htmlFor="my-currPassword"
      >
        <Input
          disabled={true}
          required={true}
          type="password"
          name="currPassword"
          id="my-currPassword"
        />
      </FormRow>

      <FormRow orientation="horizontal" label="Password" htmlFor="my-password">
        <Input
          required={true}
          type="password"
          name="password"
          id="my-password"
        />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Confirm Password"
        htmlFor="my-confirmPassword"
      >
        <Input
          required={true}
          type="password"
          name="confirmPassword"
          id="my-confirmPassword"
        />
      </FormRow>

      <Box className=" flex gap-5 mt-5 justify-end">
        <Button type="cancel">Cancel</Button>
        <Button action="submit" loading={loading} type="primary">
          Update Password
        </Button>
      </Box>
    </form>
  );
}
