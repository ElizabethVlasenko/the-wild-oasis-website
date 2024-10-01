"use client";
import StarRating from "@/app/_components/StarRating";
import SubmitButton from "@/app/_components/SubmitButton";
import {
  createContactMessageAction,
  createReviewAction,
} from "@/app/_lib/actions";
import { useState } from "react";

function RateCabinForm({ session, bookingId, cabinId }) {
  const [ratings, setRatings] = useState({});

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
    cleanlinessRating: ratings.cleanliness,
    locationRating: ratings.location,
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

  const formAction = async (formData) => {
    await createReviewWithData(formData);
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
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-500"
          rows={1}
        />
      </div>

      <div className="space-y-2">
        <label>Review</label>
        <textarea
          placeholder="Write a short summary of your stay"
          name="review"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm placeholder:text-primary-500"
          rows={3}
        />
      </div>

      <div className="">
        <label>Location</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "location")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Cleanliness</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "cleanliness")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Comfort & Amenities</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "comfort")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Outdoor Activities</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "activities")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="Host & Service">
        <label>Host & Service</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "service")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="">
        <label>Value for Money</label>
        <StarRating
          size={30}
          onSetRating={(rating) => handleRatingSet(rating, "valueForMoney")}
          maxRating={10}
          color="#C69963"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton>Submit review</SubmitButton>
      </div>
    </form>
  );
}

export default RateCabinForm;
