import React from "react"
import { Link } from "react-router-dom";

export default function SingleReservation({ reservation }) {
    const seatLink = `/reservations/${reservation.reservation_id}/seat`
    return (
        <tr>
            <th scope="row">{reservation.reservation_id}</th>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td>{reservation.status}</td>
            <Link to={seatLink}>
                <button className="btn btn-secondary m-1">Seat</button>
            </Link>
        </tr>
    );
}