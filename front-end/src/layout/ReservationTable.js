import React from "react";
import SingleReservation from "./SingleReservation";

export default function ReservationTable({ reservations }) {
    const list = reservations.map((res) => <SingleReservation reservation={res}/>);
    return (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TIME</th>
                    <th scope="col">PEOPLE</th>
                    <th scope="col">STATUS</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    </div>
    );
}