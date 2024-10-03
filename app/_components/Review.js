"use client";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

function Review({ reviews }) {
  const [isVisible, setIsVisible] = useState(false);

  const displayReviews = isVisible ? reviews : reviews.slice(0, 3);

  if (reviews.length === 0) return null;

  return (
    <>
      <h2 className="mt-10 text-5xl font-semibold text-center mb-10 text-accent-400">
        Reviews
      </h2>
      <div className="mt-10 flex flex-row flex-wrap gap-[2.7rem] justify-start">
        {displayReviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
        {reviews.length > 3 ? (
          <div
            className="p-5 bg-primary-800 w-full cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            <p className="text-center text-xl ">
              Show {isVisible ? "less" : "more"} reviews
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Review;
