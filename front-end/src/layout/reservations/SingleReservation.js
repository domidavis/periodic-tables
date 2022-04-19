import React from "react"

export default function SingleReservation({ reservation }) {
    return (
        <tr>
            <th scope="row">{reservation.reservation_id}</th>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
        </tr>
    );
}