"use client";
import { FormEvent, useState } from "react";
import FormRow from "./FormRow";
import Input from "./Input";
import { signUp } from "../_lib/actions";
import { toast } from "sonner";
import Button from "./Button";

function SignUpForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = await signUp(formData);
    if (data.status === "error") {
      toast.error(data.message);
    } else {
      toast.success("User successfully created");
    }
    setLoading(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-[2.4rem] px-[4rem] bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] text-[1.4rem] rounded-[var(--border-radius-md)]"
    >
      <FormRow orientation="horizontal" label="Full name" htmlFor="my-fullName">
        <Input required={true} type="text" name="fullName" id="my-fullName" />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Email address"
        htmlFor="my-email"
      >
        <Input required={true} type="email" name="email" id="my-email" />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Password (min 8 characters)"
        htmlFor="my-password"
      >
        <Input
          required={true}
          type="password"
          name="password"
          id="my-password"
        />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Repeat password"
        htmlFor="confirm-password"
      >
        <Input
          required={true}
          type="password"
          name="confirmPassword"
          id="confirm-password"
        />
      </FormRow>

      <div className=" flex gap-5 mt-5 justify-end">
        <Button type="cancel">Cancel</Button>
        <Button action="submit" loading={loading} type="primary">
          Create new user
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
