"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateReservationAction(formData) {
  //1) Authentication
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update your reservation");

  //2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId"));

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You can only delete your own reservations");

  //3) Building updated data
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  //5) Error handling
  if (error) throw new Error("Booking could not be updated");

  //6) Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  //7) Redirecting
  redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to create your reservation");

  const newBooking = {
    ...bookingData,
    guestID: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    checkInTime: formData.get("checkInTime"),
    checkOutTime: formData.get("checkOutTime"),
    isPaid: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete your reservation");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You can only delete your own reservations");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createContactMessageAction(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to send a report message");

  console.log(formData);

  const contactData = {
    guestId: session.user.guestId,
    bookingId: formData.get("bookingId"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    subject: formData.get("subject").slice(0, 1000),
    message: formData.get("message"),
  };

  const { error } = await supabase.from("contact").insert([contactData]);
  if (error) throw new Error("Contact message could not be created");

  revalidatePath("/account/report");
  redirect("/account/reservations/report/success");
}

export async function updateContactMessageAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update this report");

  const reportId = formData.get("reportId");

  const updateData = {
    subject: formData.get("subject"),
    message: formData.get("message").slice(0, 1000),
  };

  const { data, error } = await supabase
    .from("contact")
    .update(updateData)
    .eq("id", reportId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/report");
  redirect("/account/report");
}
