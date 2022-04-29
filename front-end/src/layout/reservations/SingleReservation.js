import React from "react";
import { useHistory , Link } from "react-router-dom";
import { cancelReservation } from "../../utils/api";

export default function SingleReservation({ reservation, setError }) {
  const history = useHistory();
  const seatLink = `/reservations/${reservation.reservation_id}/seat`;
  const editLink = `/reservations/${reservation.reservation_id}/edit`;

  const handleCancel = async (event) => {
    const ac = new AbortController();
    const confirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmed) {
      try {
        const resId = reservation.reservation_id;
        setError(null);
        await cancelReservation(resId, ac.signal);
        history.go();
      } catch (e) {
        setError(e);
      }
    }
  };

  return (
    <tr className="card px-3 pb-3" >
      <td className="card-text mb-2">
        <br /> <span className="domi-ba-color mb-1">Reservation Id: </span> {reservation.reservation_id}
        <br /> <span className="domi-ba-color mb-1">Name: </span> {reservation.last_name}, {reservation.first_name}
        <br /> <span className="domi-ba-color mb-1">Phone Number: </span> {reservation.mobile_number}
        <br /><span className="domi-ba-color mb-1">Reservation Time: </span> {reservation.reservation_time}
        <br /> <span className="domi-ba-color mb-1">Party Size: </span> {reservation.people}
        <br /> <span className="domi-ba-color mb-1">Status: </span> <span data-reservation-id-status={reservation.reservation_id}> {reservation.status}  </span>
      </td>
      
      {reservation.status === "booked" && (
        <td className="d-flex justify-content-end">
          <Link 
            to={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-outline-info m-1"
          >Seat</Link>
       
          <Link href={editLink}
            to={`/reservations/${reservation.reservation_id}/edit`}
            className="btn btn-outline-info m-1"
          >Edit
          </Link>
    
          <button
            onClick={handleCancel}
            data-reservation-id-cancel={reservation.reservation_id}
            className="btn btn-outline-info m-1"
          >
            Cancel
          </button>
        </td>
      )}
    </tr>
  );
}
