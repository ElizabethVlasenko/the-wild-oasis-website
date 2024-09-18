"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservationAction } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user, settings }) {
  const { range, resetRange, setNumGuests, breakfast, numGuests } =
    useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const { maxCheckOutTime, minCheckInTime, breakfastPrice } = settings;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const extrasPrice = breakfastPrice * numGuests * numNights;
  const totalPrice = cabinPrice + extrasPrice;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinID: id,
    extrasPrice,
    totalPrice,
    hasBreakfast: breakfast,
  };

  const createReservationWithData = createReservationAction.bind(
    null,
    bookingData
  );

  const formAction = async (formData) => {
    await createReservationWithData(formData);
    resetRange();
  };

  return (
    <div className="">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={formAction}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            onChange={(e) => {
              setNumGuests(e.target.value);
            }}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="checkInTime">
            What time do you want to check in?
          </label>
          <input
            type="time"
            name="checkInTime"
            id="checkInTime"
            defaultValue={minCheckInTime}
            min={minCheckInTime}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="checkOutTime">
            What time do you want to check out?
          </label>
          <input
            type="time"
            name="checkOutTime"
            id="checkOutTime"
            defaultValue={maxCheckOutTime}
            max={maxCheckOutTime}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
