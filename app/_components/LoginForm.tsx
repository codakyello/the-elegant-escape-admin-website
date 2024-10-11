"use client";
import FormRow from "@/app/_components/FormRow";
import Input from "./Input";
import { FormEvent, useState } from "react";
import { login } from "../_lib/actions";
import { toast } from "sonner";
import { useAuth } from "../_contexts/AuthProvider";
import SpinnerMini from "@/app/_components/SpinnerMini";
function LoginForm() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const data = await login(formData);

    if (data.status === "error") {
      toast.error(data.message);
    } else {
      setUser({ ...data.user, token: data.token });
    }
    setLoading(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-stretch flex-col py-[2.4rem] px-[4rem] bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] text-[1.4rem] w-full max-w-[48rem]"
    >
      <FormRow label="Email address" htmlFor="my-email">
        <Input name="email" type="email" id="my-email" />
      </FormRow>

      <FormRow label="Password" htmlFor="my-password">
        <Input name="password" type="password" id="my-password" />
      </FormRow>

      <div className="flex flex-col gap-[.8rem] my-[1.2rem]">
        {/* <Button action="submit" type="primary" loading={loading}>
          Login
        </Button> */}
        <button
          type="submit"
          className="flex justify-center items-center py-[1.2rem] px-[1.6rem] bg-[var(--color-brand-600)] rounded-md text-[var(--color-grey-0)]"
        >
          {loading ? <SpinnerMini /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
