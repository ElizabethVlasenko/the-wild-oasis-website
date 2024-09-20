import ReservationCard from "./ReservationCard";

function NextReservation({ booking }) {
  return (
    <div>
      <h3 className="font-semibold text-xl text-primary-400 mb-2">
        Your next reservation
      </h3>
      <ReservationCard
        booking={booking}
        key={booking.id}
        location="dashboard"
        // onDelete={handleDelete}
      />
    </div>
  );
}

export default NextReservation;
