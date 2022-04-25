import React from "react";
import SingleReservation from "./SingleReservation";

export default function ReservationTable({ reservations, setError }) {
    const list = reservations.map((res) => <SingleReservation reservation={res} setError={setError} key={res.reservation_id}/>);
    return (
    <div>
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TIME</th>
                    <th scope="col">PEOPLE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
        {list < 1 && (
                <div>
                    No reservations found.
                </div>
            )}
    </div>
    );
}