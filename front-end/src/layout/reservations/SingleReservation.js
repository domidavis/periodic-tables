import React from "react";
import { useHistory } from "react-router-dom";
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
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>
        {reservation.last_name}, {reservation.first_name}
      </td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      {reservation.status === "booked" && (
        <td>
          <a href={seatLink}>
            <button className="btn btn-outline-info m-1">Seat</button>
          </a>
        <td>
          <a href={editLink}>
            <button className="btn btn-outline-info m-1">Edit</button>
          </a>
        </td>

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
