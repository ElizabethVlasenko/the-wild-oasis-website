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
        className="pt-12 pb-8 place-self-center"
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

      <div className="bg-accent-500 text-primary-800 p-8 pt-6 ">
        <div className="flex gap-4 items-baseline justify-between border-b-2 border-accent-600 py-2">
          <p className="text-xl">Cabin price</p>
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span>/night</span>
              </>
            ) : (
              <>
                <span className="text-2xl">${regularPrice}</span>
                <span>/night</span>
              </>
            )}
          </p>
        </div>

        {numNights ? (
          <>
            <div className="flex gap-4 items-baseline justify-between border-b-2 border-accent-600 py-2">
              <p className="text-xl">Number of nights</p>
              <p className="flex gap-2 items-baseline">
                <span className="text-2xl">{numNights}</span>
                <span>nights</span>
              </p>
            </div>

            <div
              className={`flex gap-4 items-baseline justify-between border-b-2 border-accent-600 py-2 ${
                breakfast ? "" : "text-accent-700"
              }`}
            >
              <p className="text-xl">
                Total breakfast price (optional){" "}
                <span className="text-sm">(${breakfastPrice}/person)</span>
              </p>
              <p className="flex gap-2 items-baseline">
                <span className="text-2xl">
                  ${numGuests * breakfastPrice * numNights}
                </span>
              </p>
            </div>

            <div className="flex gap-4 items-baseline justify-between border-b-2 border-accent-600 py-2">
              <p className="text-xl font-bold">
                Total price
                {breakfast ? (
                  <span className="text-sm font-normal">
                    {" "}
                    (breakfast for {numGuests} included)
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p className="font-bold">
                <span className="text-2xl">
                  $
                  {breakfast
                    ? cabinPrice + numGuests * breakfastPrice * numNights
                    : cabinPrice}
                </span>
              </p>
            </div>

            <div className="flex gap-4 items-baseline justify-between pt-8">
              <button
                className={`border border-primary-800 py-2 px-4 text-sm font-semibold ${
                  breakfast ? "bg-accent-400 text-primary-900" : ""
                }}`}
                onClick={() => setBreakfast((br) => !br)}
              >
                {breakfast ? "Breakfast included ✓" : "Include breakfast +"}
              </button>

              {range.from || range.to ? (
                <button
                  className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                  onClick={resetRange}
                >
                  Clear
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
