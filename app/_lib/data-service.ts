"use server";
// import { notFound } from "next/navigation";
// import { eachDayOfInterval } from "date-fns";

import { revalidatePath } from "next/cache";
import { Setting } from "../_components/UpdateSettingsForm";

const URL = "https://the-elegant-escape-4iqb.vercel.app/api/v1";
// const DEV_URL = "http://localhost:3001/api/v1";

// /////////////
// // AUTH

export async function getSettings() {
  try {
    const res = await fetch(
      `https://the-eleganta-escape.vercel.app/api/v1/settings`,
      {
        next: {
          revalidate: 5,
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(data.message || "Settings couldnt load");

    const {
      data: { settings },
    } = data;
    return settings;
  } catch (err) {
    throw err;
  }
}
export async function updateSetting(data: Partial<Setting>, token: string) {
  if (!token) return;
  try {
    const res = await fetch(`${URL}/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // Send the serialized data
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to update settings");

    const {
      data: { settings },
    } = result;

    revalidatePath("/dashboard/settings");
    return settings;
  } catch (err) {
    if (err instanceof Error) {
      return { status: "error", message: err.message };
    }
    return { status: "error", message: "An unknown error occured" };
  }
}
export async function login(formData: FormData) {
  // Safely extract email and password
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validate that email and password are not null
  if (!email || !password) {
    return { status: "error", message: "Email and password are required." };
  }

  console.log(email, password);

  try {
    const res = await fetch(`${URL}/admins/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      // next: {
      //   revalidate: 5,
      // },
    });
    console.log("not crashded");

    const data = await res.json();

    // Check if the response was successful
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Destructure token and user from response
    const {
      token,
      data: { user },
    } = data;
    return { token, user };
  } catch (err: unknown) {
    console.log(err);
    // Improved error handling
    if (err instanceof Error) {
      return { status: "error", message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}

export async function signUp(formData: FormData, token: string) {
  // always check if a user is authenticated before any mutations
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("fullName");
  const confirmPassword = formData.get("confirmPassword");
  const isRoot = formData.get("isRoot") === "on" ? true : false;
  console.log("this is token", token);

  let res;
  try {
    // const token = getToken
    res = await fetch(`${URL}/admins/signUp`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        confirmPassword,
        isRoot,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // Check if the response was successful
    if (!res.ok) throw new Error(data.message || "Signup failed");

    // Destructure token and user from response
    const {
      data: { user },
    } = data;

    return { token, user };
  } catch (err: unknown) {
    console.log(err);
    // Improved error handling
    if (err instanceof Error) {
      return { status: "error", statusCode: res?.status, message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}

export async function authorize(token: string) {
  try {
    if (!token) return false;

    const res = await fetch(`${URL}/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("");
    return true;
  } catch {
    return false;
  }
}
export async function getAdmin(token: string | undefined) {
  let statusCode;
  try {
    const res = await fetch(`${URL}/admins/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    statusCode = res.status;
    if (!res.ok) throw new Error(data.message);

    const {
      data: { admin },
    } = data;
    return admin;
  } catch (err: unknown) {
    // Improved error handling
    if (err instanceof Error) {
      return { status: "error", statusCode, message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}

export async function updateAdmin(
  token: string,
  formData: {
    email: FormDataEntryValue;
    name: FormDataEntryValue;
    image?: string | undefined;
  }
) {
  let statusCode;
  // console.log(token);
  try {
    const res = await fetch(`${URL}/admins/updateMe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    statusCode = res.status;
    // Check if the response was successful
    if (!res.ok) throw new Error(data.message || "Signup failed");

    // Destructure token and user from response
    const {
      data: { admin },
    } = data;

    revalidatePath("/dashboard/account");
    return admin;
  } catch (err: unknown) {
    console.log(err);
    // Improved error handling
    if (err instanceof Error) {
      return { status: "error", statusCode, message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}

export async function updatePassword(
  formFields: {
    currPassword: FormDataEntryValue;
    password: FormDataEntryValue;
    confirmPassword: FormDataEntryValue;
  },
  token: string
) {
  let statusCode;
  try {
    const res = await fetch(`${URL}/admins/updateMyPassword`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formFields),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update password");

    const {
      data: { admin },
      token: adminToken,
    } = data;

    return { admin, token: adminToken };
  } catch (err) {
    if (err instanceof Error) {
      return { status: "error", statusCode, message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}

export async function getBookings(token: string | null) {
  let statusCode;
  try {
    const res = await fetch(`${URL}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the 'Authorization' key is capitalized
      },
      next: { revalidate: 60 },
    });

    const data = await res.json();

    statusCode = res.status;

    if (!res.ok) {
      throw new Error(data.message);
    }

    console.log(data);
    const {
      data: { bookings },
    } = data;

    return bookings;
  } catch (err) {
    if (err instanceof Error) {
      return { status: "error", statusCode, message: err.message };
    } else {
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}
// export async function login(email, password) {
//   const res = await fetch(`${URL}/guests/login`, {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);

//   const {
//     token,
//     data: { user },
//   } = data;

//   return { user, token };
// }

// export async function getGuest(email) {
//   const res = await fetch(`${URL}/guests/email/?email=${email}`, {
//     headers: {
//       "Content-Type": "application/json", // Set the content type to JSON
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);

//   const {
//     data: { guest },
//   } = data;

//   return guest;
// }
// export async function createGuest(user) {
//   console.log(user);
//   const res = await fetch(`${URL}/guests/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Set the content type to JSON
//     },
//     body: JSON.stringify(user),
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);

//   const {
//     data: { guest },
//   } = data;
//   return guest;
// }

// export async function updateGuest(formData) {
//   const token = await getToken();

//   const res = await fetch(`${URL}/guests/updateMe`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();

//   console.log(data);

//   if (!res.ok) throw Error(data.message);
//   const {
//     data: { guest },
//   } = data;
//   return guest;
// }

// export async function signIn(email) {
//   try {
//     const res = await fetch(`${URL}/guests/signIn`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Set the content type to JSON
//       },

//       body: JSON.stringify({
//         email,
//       }),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (!res.ok) throw new Error(data.message);

//     const {
//       data: { user },
//       token,
//     } = data;
//     return { user, token };
//   } catch (err) {
//     console.log("An error occured");
//     console.error(err.message);
//   }
// }
// /////////////
// // GET

// export async function getCabinPrice(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("regularPrice, discount")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//   }

//   return data;
// }

// export async function getCabin(id) {
//   try {
//     const res = await fetch(
//       `${URL}/cabins/${id}`,

//       {
//         next: {
//           revalidate: 60,
//         },
//       }
//     );

//     const data = await res.json();
//     // data.error || data.data

//     if (!res.ok) {
//       throw new Error(data.error);
//     }

//     const {
//       data: { cabin },
//     } = data;

//     return cabin;
//   } catch {
//     notFound();
//   }
// }

// export const getCabins = async function (filters) {
//   let query = "";
//   if (filters?.capacity) {
//     switch (filters.capacity) {
//       case "small":
//         query += "maxCapacity[lte]=3";
//         break;
//       case "medium":
//         query += "maxCapacity[gte]=4&maxCapacity[lte]=7";
//         break;
//       case "large":
//         query += "maxCapacity[gte]=8";
//         break;
//       default:
//         break;
//     }
//   }

//   try {
//     const res = await fetch(`${URL}/cabins?${query}`, {
//       next: {
//         revalidate: 60,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message);
//     }

//     const {
//       data: { cabins },
//     } = data;

//     return cabins;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Guests are uniquely identified by their email address

// export async function getBooking(bookingId) {
//   const token = await getToken();
//   try {
//     const res = await fetch(`${URL}/bookings/${bookingId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Set the content type to JSON
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) throw new Error(data.message);

//     const {
//       data: { booking },
//     } = data;

//     return booking;
//   } catch {
//     notFound();
//   }
// }

// export async function getBookedDatesByCabinId(cabinId) {
//   let today = new Date();
//   today.setUTCHours(0, 0, 0, 0);
//   today = today.toISOString();

//   const res = await fetch(
//     `https://the-eleganta-escape.vercel.app/api/v1/cabins/${cabinId}/bookings`,
//     {
//       next: {
//         revalidate: 60,
//       },
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.error);

//   const {
//     data: { bookings },
//   } = data;

//   const bookedDates = bookings
//     .map((booking) => {
//       return eachDayOfInterval({
//         start: new Date(booking.startDate),
//         end: new Date(booking.endDate),
//       });
//     })
//     .flat();

//   console.log(bookedDates);

//   return bookedDates;
// }

// export async function getCountries() {
//   try {
//     const res = await fetch(
//       "https://restcountries.com/v2/all?fields=name,flag"
//     );
//     if (!res.ok) throw new Error("Could not fetch countries");
//     const countries = await res.json();

//     return countries;
//   } catch (err) {
//     console.log("error is", err);
//     throw new Error(err.message);
//   }
// }

// /////////////
// // CREATE

// export async function createBooking(formData) {
//   const token = await getToken();

//   const res = await fetch(`${URL}/bookings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();

//   if (!res.ok) throw Error(data.message);

//   const {
//     data: { bookings },
//   } = data;
//   return bookings;
// }

// export async function updateBooking(formData, bookingId) {
//   const token = await getToken();
//   try {
//     const res = await fetch(`${URL}/bookings/${bookingId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (!res.ok) throw Error(data.message);

//     const {
//       data: { booking },
//     } = data;

//     console.log("updated booking", booking);
//     return booking;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// /////////////
// // DELETE

// export async function deleteBooking(bookingId) {
//   const token = await getToken();
//   const res = await fetch(`${URL}/bookings/${bookingId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // Check if the response status is 204 (No Content)
//   if (res.status !== 204) {
//     const data = await res.json();
//     throw new Error(data.message || "Booking could not be delete booking");
//   }
// }

// export async function updateSetting(formData: FormData) {
//   const data = Object.fromEntries(formData);

//   console.log(data);

//   try {
//     const res = await fetch(`${URL}/settings`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data), // Send the serialized data
//     });

//     const result = await res.json();

//     if (!res.ok) throw new Error(result.message || "Failed to update settings");

//     const {
//       data: { settings },
//     } = result;

//     console.log("updated booking", settings);
//     return settings;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return { status: "error", message: err.message };
//     }
//     return { status: "error", message: "An unknown error occured" };
//   }
// }
