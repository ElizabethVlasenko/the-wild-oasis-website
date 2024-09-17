"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDays }) {
  const { range, setRange, resetRange, breakfast, setBreakfast, numGuests } =
    useReservation();

  const displayRange = isAlreadyBooked(range, bookedDays) ? {} : range;

  //CABIN
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength, breakfastPrice } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 pb-3 place-self-center"
        mode="range"
        onSelect={(range) => setRange(range)}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={4}
        excludeDisabled
        disabled={(curDate) =>
          isPast(curDate) || bookedDays.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-start justify-between gap-4 px-8 py-4 bg-accent-500 text-primary-800 h-[134px] flex-col">
        <div className="flex  gap-6 items-baseline">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              {!breakfast ? (
                <p>
                  Include breakfast?{" "}
                  <span
                    className="cursor-pointer underline"
                    onClick={() => setBreakfast(true)}
                  >
                    Yes
                  </span>
                </p>
              ) : (
                <p>
                  Breakfast:{" "}
                  <span className="text-2xl">
                    ${numGuests * breakfastPrice * numNights}
                  </span>{" "}
                  (${breakfastPrice} / person){" "}
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() => setBreakfast(false)}
                  >
                    x
                  </span>
                </p>
              )}
            </>
          ) : null}
        </div>

        <div className="flex items-baseline gap-6 justify-between w-full">
          {numNights ? (
            <p>
              <span className="text-lg font-bold uppercase">Total</span>{" "}
              <span className="text-2xl font-semibold">
                $
                {breakfast
                  ? cabinPrice + numGuests * breakfastPrice * numNights
                  : cabinPrice}
              </span>
            </p>
          ) : null}

          {range.from || range.to ? (
            <button
              className="border border-primary-800 py-2 px-4 text-sm font-semibold"
              onClick={resetRange}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
