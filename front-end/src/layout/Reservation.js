import React from "react";

export default function Reservation({reservation}) {
    return (
    <div>
        <span>{reservation.first_name}</span>
        <span>{reservation.last_name}</span>
        <span>{reservation.mobile_number}</span>
        <span>{reservation.reservation_date}</span>
        <span>{reservation.reservation_time}</span>
    </div>
    );
}