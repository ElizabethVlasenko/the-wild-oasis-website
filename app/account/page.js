import { isPast } from "date-fns";
import NextReservation from "../_components/NextReservation";
import { auth } from "../_lib/auth";
import { getBookings, getGuest } from "../_lib/data-service";
import LoyaltySystemStatistics from "../_components/LoyaltySystemStatistics";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  const [bookings, guest] = await Promise.all([
    getBookings(session.user.guestId),
    getGuest(session.user.email),
  ]);

  const futureBookings = bookings.filter(
    (booking) => !isPast(new Date(booking.startDate))
  );
  const nextBooking = futureBookings.sort(
    (a, b) => b.startDate - a.startDate
  )[0];

  const firstName = session.user.name.split(" ")[0];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {firstName}!
      </h2>
      <LoyaltySystemStatistics bookings={bookings} guest={guest} />
      {nextBooking ? <NextReservation booking={nextBooking} /> : null}
    </div>
  );
}
