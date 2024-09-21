import {
  CalendarDaysIcon,
  IdentificationIcon,
  KeyIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

import { format, formatDistance, isPast } from "date-fns";

async function LoyaltySystemStatistics({ bookings, guest }) {
  const futureBookings = bookings.filter(
    (booking) => !isPast(new Date(booking.startDate))
  );

  const pastBookings = bookings.filter((booking) =>
    isPast(new Date(booking.startDate))
  );

  const numNightsStayed = pastBookings.reduce(
    (acc, booking) => acc + booking.numNights,
    0
  );

  const dateJoined = guest.created_at;
  const memberFor = formatDistance(dateJoined, new Date());

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-xl text-primary-400 mb-2 ">
        Loyalty system
      </h3>
      <div className="grid grid-cols-4 gap-6 text-primary-100">
        <div className="flex gap-6 justify-center flex-col bg-primary-800 items-center p-6 rounded-lg aspect-square">
          <MoonIcon className="h-10 w-10 text-primary-400 transition-colors" />
          <p className="text-2xl text-center leading-none">
            <span className="text-sm"> You stayed </span>
            {numNightsStayed ? numNightsStayed : 0}
            <span className="text-sm"> nights with us</span>
          </p>
        </div>

        <div className="flex gap-6 justify-center flex-col bg-primary-800 items-center p-6 rounded-lg aspect-square">
          <CalendarDaysIcon className="h-10 w-10 text-primary-400 transition-colors" />
          <p className="text-2xl text-center leading-none">
            <span className="text-sm"> You came to stay with us </span>
            {pastBookings.length ? pastBookings.length : 0}

            <span className="text-sm">
              {" "}
              time{pastBookings.length > 1 && "s"}
            </span>
          </p>
        </div>

        <div className="flex gap-6 justify-center flex-col bg-primary-800 items-center p-6 rounded-lg aspect-square">
          <KeyIcon className="h-10 w-10 text-primary-400 transition-colors" />
          <p className="text-2xl text-center leading-none">
            <span className="text-sm"> You have </span>
            {futureBookings.length ? futureBookings.length : 0}

            <span className="text-sm">
              {" "}
              stay{futureBookings.length > 1 && "s"} with us in the future
            </span>
          </p>
        </div>

        <div className="flex gap-6 justify-center flex-col bg-primary-800 items-center p-6 rounded-lg aspect-square">
          <IdentificationIcon className="h-10 w-10 text-primary-400 transition-colors" />
          <p className="text-2xl text-center leading-none">
            <span className="text-sm">You have been a member for </span>{" "}
            {/* {format(dateJoined, "dd MMM yyyy")}  */}
            {memberFor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoyaltySystemStatistics;
