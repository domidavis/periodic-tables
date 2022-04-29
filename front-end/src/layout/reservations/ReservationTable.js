import React from "react";
import SingleReservation from "./SingleReservation";

export default function ReservationTable({ reservations, setError }) {
    const list = reservations.map((res) => <div className="col"><SingleReservation reservation={res} setError={setError} key={res.reservation_id}/> </div>);
    
    return (
    <div className="container-responsive-md">
        <div className="row mt-4">
            {list}
        </div>
        {list < 1 && (
            <div className="alert domi-ba-color text-lg" role="alert">
                No reservations found.
            </div>
        )}
    </div>
    );
}