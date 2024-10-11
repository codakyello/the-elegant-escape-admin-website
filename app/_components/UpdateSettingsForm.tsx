"use client";
import { useState } from "react";
import FormRow from "./FormRow";
import Input from "./Input";
import { updateSetting } from "../_lib/data-service";
import { useAuth } from "../_contexts/AuthProvider";
import { toast } from "sonner";

type Setting = {
  _id: string;
  minBookingLength: number;
  maxBookingLength: number;
  breakFastPrice: number;
  maxGuestsPerBooking: number;
};

type UpdateSettingResult = {
  status: "success" | "error";
  message: string;
  setting?: Setting;
};
export default function UpdateSettingsForm({
  settings,
}: {
  settings: Setting;
}) {
  const [loading, setLoading] = useState(false);
  const {
    minBookingLength,
    maxBookingLength,
    breakFastPrice,
    maxGuestsPerBooking,
  } = settings;
  const { getToken } = useAuth();

  return (
    <form className="flex flex-col py-[2.4rem] px-[4rem] bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] text-[1.4rem] rounded-[var(--border-radius-md)]">
      <FormRow
        orientation="horizontal"
        label="Minimum nights/booking"
        htmlFor="min-nights"
      >
        <Input
          required={true}
          type="number"
          name="minBookingLength"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={loading}
          handleBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;
            console.log(name);

            if (!value || parseFloat(value) < 1) {
              return;
            }
            const token = getToken();
            const data = {
              [name]: value,
            };
            const result = await updateSetting(data, token);
            if (result.status === "error") {
              toast.error(result.message);
            } else {
              console.log(result);
              toast.success("Settings updated successfully");
            }
          }}
        />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Maximum nights/booking"
        htmlFor="max-bookingLength"
      >
        <Input
          required={true}
          type="number"
          name="maxBookingLength"
          id="max-bookingLength"
          defaultValue={maxBookingLength}
          disabled={loading}
          handleBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
            setLoading(true);
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;
            console.log(name);

            if (!value || parseFloat(value) < 1) {
              return;
            }
            const token = getToken();
            const data = {
              [name]: value,
            };
            const result: UpdateSettingResult = await updateSetting(
              data,
              token
            );
            if (result.status === "error") {
              toast.error(result.message);
            } else {
              toast.success("Settings updated successfully");
            }
            setLoading(false);
          }}
        />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="Maximum guests/booking"
        htmlFor="max-guests"
      >
        <Input
          required={true}
          type="number"
          name="maxGuestsPerBooking"
          id="max-guests"
          disabled={loading}
          defaultValue={maxGuestsPerBooking}
          handleBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
            setLoading(true);
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;
            console.log(name);

            if (!value || parseFloat(value) < 1) {
              return;
            }
            const token = getToken();
            if (!token) return;
            const data = {
              [name]: value,
            };
            const result: UpdateSettingResult = await updateSetting(
              data,
              token
            );
            if (result.status === "error") {
              toast.error(result.message);
            } else {
              toast.success("Settings updated successfully");
            }
            setLoading(false);
          }}
        />
      </FormRow>

      <FormRow
        orientation="horizontal"
        label="BreakFast price"
        htmlFor="breakfast-price"
      >
        <Input
          required={true}
          type="number"
          name="breakFastPrice"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={loading}
          handleBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
            setLoading(true);
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;
            console.log(name);

            if (!value || parseFloat(value) < 1) {
              return;
            }
            const token = getToken();
            const data = {
              [name]: value,
            };
            const result: UpdateSettingResult = await updateSetting(
              data,
              token
            );
            if (result.status === "error") {
              toast.error(result.message);
            } else {
              toast.success("Settings updated successfully");
            }
            setLoading(false);
          }}
        />
      </FormRow>

      {/* <div className=" flex gap-5 mt-5 justify-end">
        <Button type="cancel">Cancel</Button>
        <Button loading={loading} action="submit" type="primary">
          Update settings
        </Button>
      </div> */}
    </form>
  );
}
