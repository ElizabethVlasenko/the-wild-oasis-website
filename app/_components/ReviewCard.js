import { format } from "date-fns";
import StarRating from "./StarRating";

function ReviewCard({ review }) {
  const {
    title,
    review: reviewText,
    cleanlinessRating,
    locationRating,
    comfortRating,
    activitiesRating,
    serviceRating,
    valueForMoneyRating,
    totalRating,
    guests: { fullName },
    bookings: { startDate, endDate, numNights },
  } = review;

  return (
    <div className="bg-primary-900 p-5 w-[355px]">
      <p className="text-center mb-2 text-xl">
        {fullName.split(" ")[0] +
          " " +
          fullName.split(" ")[1].slice(0, 1) +
          "."}
      </p>
      <div className="flex mb-3">
        {Array.from({ length: 10 }, (_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={i <= totalRating ? "#C69963" : null}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <h4 className="text-xl font-semibold text-accent-400 mb-2">{title}</h4>
      <div className="h-72 overflow-y-auto mb-5 pr-2">
        <p>{reviewText}</p>
      </div>
      <p className="text-primary-300 text-sm">
        {format(new Date(startDate), "MMM dd yyyy")} -{" "}
        {format(new Date(endDate), "MMM dd yyyy")} ({numNights} night
        {numNights > 1 && "s"})
      </p>
    </div>
  );
}

export default ReviewCard;
