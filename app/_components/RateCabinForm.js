"use client";
import StarRating from "@/app/_components/StarRating";
import SubmitButton from "@/app/_components/SubmitButton";
import {
  createContactMessageAction,
  createReviewAction,
  updateReviewAction,
} from "@/app/_lib/actions";
import { useState } from "react";

function RateCabinForm({ session, bookingId, cabinId, existingReview }) {
  const [ratings, setRatings] = useState({
    location: existingReview?.locationRating || 5,
    cleanliness: existingReview?.cleanlinessRating || 5,
    comfort: existingReview?.comfortRating || 5,
    activities: existingReview?.activitiesRating || 5,
    service: existingReview?.serviceRating || 5,
    valueForMoney: existingReview?.valueForMoneyRating || 5,
  });

  function handleRatingSet(rating, ratingKey) {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [ratingKey]: rating,
    }));
  }

  const reviewData = {
    guestId: session.user.guestId,
    bookingId,
    cabinId,
    locationRating: ratings.location,
    cleanlinessRating: ratings.cleanliness,
    comfortRating: ratings.comfort,
    activitiesRating: ratings.activities,
    serviceRating: ratings.service,
    valueForMoneyRating: ratings.valueForMoney,
    totalRating: Math.round(
      (ratings.cleanliness +
        ratings.location +
        ratings.comfort +
        ratings.activities +
        ratings.service +
        ratings.valueForMoney) /
        6
    ),
  };

  const createReviewWithData = createReviewAction.bind(null, reviewData);
  const updateReviewWithData = updateReviewAction.bind(null, reviewData);

  const formAction = async (formData) => {
    if (existingReview) {
      await updateReviewWithData(formData);
    } else await createReviewWithData(formData);
  };

  return (
    <form
      action={formAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col mt-7"
    >
      <div className="space-y-2">
        <label>Title</label>
        <textarea
          name="title"
          placeholder="Review title"
          defaultValue={existingReview?.title}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-500"
          rows={1}
        />
      </div>

      <div className="space-y-2">
        <label>Review</label>
        <textarea
          placeholder="Write a short summary of your stay"
          name="review"
          defaultValue={existingReview?.review}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-500"
          rows={3}
        />
      </div>

      <div className="">
        <label>Location</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "location")}
          defaultRating={ratings.location}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Cleanliness</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "cleanliness")}
          defaultRating={ratings.cleanliness}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Comfort & Amenities</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "comfort")}
          defaultRating={ratings.comfort}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Outdoor Activities</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "activities")}
          defaultRating={ratings.activities}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="Host & Service">
        <label>Host & Service</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "service")}
          defaultRating={ratings.service}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Value for Money</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "valueForMoney")}
          defaultRating={ratings.valueForMoney}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton>
          {existingReview ? "Update" : "Submit"} review
        </SubmitButton>
      </div>
    </form>
  );
}

export default RateCabinForm;
