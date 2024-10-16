// "use server";

// const URL = "https://the-elegant-escape-4iqb.vercel.app/api/v1";
// const DEV_URL = "http://localhost:3001/api/v1";

// export async function login(formData: FormData) {
//   // Safely extract email and password
//   const email = formData.get("email") as string | null;
//   const password = formData.get("password") as string | null;

//   // Validate that email and password are not null
//   if (!email || !password) {
//     return { status: "error", message: "Email and password are required." };
//   }

//   console.log(email, password);

//   try {
//     const res = await fetch(`${URL}/admins/login`, {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // next: {
//       //   revalidate: 5,
//       // },
//     });
//     console.log("not crashded");

//     const data = await res.json();

//     // Check if the response was successful
//     if (!res.ok) throw new Error(data.message || "Login failed");

//     // Destructure token and user from response
//     const {
//       token,
//       data: { user },
//     } = data;
//     return { token, user };
//   } catch (err: unknown) {
//     console.log(err);
//     // Improved error handling
//     if (err instanceof Error) {
//       return { status: "error", message: err.message };
//     } else {
//       return { status: "error", message: "An unknown error occurred" };
//     }
//   }
// }

// export async function signUp(formData: FormData, token: string) {
//   // always check if a user is authenticated before any mutations
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const name = formData.get("fullName");
//   const confirmPassword = formData.get("confirmPassword");
//   const isRoot = formData.get("isRoot") === "on" ? true : false;
//   console.log("this is token", token);

//   let res;
//   try {
//     // const token = getToken
//     res = await fetch(`${DEV_URL}/admins/signUp`, {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password,
//         name,
//         confirmPassword,
//         isRoot,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     // Check if the response was successful
//     if (!res.ok) throw new Error(data.message || "Signup failed");

//     // Destructure token and user from response
//     const {
//       data: { user },
//     } = data;

//     return { token, user };
//   } catch (err: unknown) {
//     console.log(err);
//     // Improved error handling
//     if (err instanceof Error) {
//       return { status: "error", statusCode: res?.status, message: err.message };
//     } else {
//       return { status: "error", message: "An unknown error occurred" };
//     }
//   }
// }

// // export async function updateSetting(formData: FormData) {
// //   const data = Object.fromEntries(formData);

// //   console.log(data);

// //   try {
// //     const res = await fetch(`${URL}/settings`, {
// //       method: "PATCH",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(data), // Send the serialized data
// //     });

// //     const result = await res.json();

// //     if (!res.ok) throw new Error(result.message || "Failed to update settings");

// //     const {
// //       data: { settings },
// //     } = result;

// //     console.log("updated booking", settings);
// //     return settings;
// //   } catch (err: unknown) {
// //     if (err instanceof Error) {
// //       return { status: "error", message: err.message };
// //     }
// //     return { status: "error", message: "An unknown error occured" };
// //   }
// // }
