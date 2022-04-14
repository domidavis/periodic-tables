import React from "react";
import Reservation from "./Reservation";

export default function ListReservations({reservations}) {
    return (
        <>
            {reservations.map((res) => <Reservation key={res.reservation_id} reservation={res}/>)}
        </>
    );
}