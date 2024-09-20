import { isPast } from "date-fns";
import NextReservation from "../_components/NextReservation";
import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
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
      {nextBooking ? <NextReservation booking={nextBooking} /> : null}
    </div>
  );
}
