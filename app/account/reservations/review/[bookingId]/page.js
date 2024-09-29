import RateCabinForm from "@/app/_components/RateCabinForm";
import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  return { title: `Review your stay #${params.bookingId}` };
}

async function Page({ params }) {
  const session = await auth();

  const { bookingId } = params;
  const booking = await getBooking(bookingId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Review your stay #{bookingId} at Cabin {booking.cabins.name}
      </h2>

      <ReservationCard booking={booking} location="review" />

      <RateCabinForm
        session={session}
        bookingId={bookingId}
        cabinId={booking.cabinID}
      />
    </div>
  );
}

export default Page;
