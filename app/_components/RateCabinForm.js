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
      <StarRating
        size={40}
        onSetRating={(rating) => handleRatingSet(rating, "cleanliness")}
        maxRating={10}
        color="#C69963"
      />

      <StarRating
        size={40}
        onSetRating={(rating) => handleRatingSet(rating, "location")}
        maxRating={10}
        color="#C69963"
      />

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

      <div className="flex justify-end items-center gap-6">
        <SubmitButton>Submit review</SubmitButton>
      </div>
    </form>
  );
}

export default RateCabinForm;
