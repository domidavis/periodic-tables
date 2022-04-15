import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { formatAsDate, createReservation } from "../utils/api";

export default function CreateReservation() {

    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        people: "",
        reservation_date: "",
        reservation_time: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrors(null);
            await createReservation(reservation);
            console.log(reservation.reservation_date);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch(e) {
            setErrors(e.response.data.error)
        }
    };

    return (
        <div>
            <h1>Create Reservation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="first_name"
                className="form-label">First name:</label>
                <input
                id="first_name"
                className="form-control"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                onChange={(e) => setReservation({...reservation, first_name: e.target.value})}
                value={reservation.first_name}
                />
                <label htmlFor="last_name"
                className="form-label">Last name:</label>
                <input
                id="last_name"
                className="form-control"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                onChange={(e) => setReservation({...reservation, last_name: e.target.value})}
                value={reservation.last_name}
                />
                <label htmlFor="mobile_number"
                className="form-label">Mobile number:</label>
                <input
                id="mobile_number"
                className="form-control"
                type="tel"
                name="mobile_number"
                onChange={(e) => setReservation({...reservation, mobile_number: e.target.value})}
                value={reservation.mobile_number}
                />
                <label htmlFor="people"
                className="form-label">People:</label>
                <input
                id="people"
                className="form-control"
                type="number"
                name="people"
                onChange={(e) => setReservation({...reservation, people: e.target.value})}
                value={reservation.people}
                />
                <label htmlFor="reservation_date"
                className="form-label">Reservation date:</label>
                <input
                id="reservation_date"
                className="form-control"
                type="date"
                name="reservation_date"
                onChange={(e) => setReservation({...reservation, reservation_date: e.target.value})}
                value={reservation.reservation_date}
                />
                <label htmlFor="reservation_time"
                className="form-label">Reservation time:</label>
                <input
                id="reservation_time"
                className="form-control"
                type="time"
                name="reservation_time"
                onChange={(e) => setReservation({...reservation, reservation_time: e.target.value})}
                value={reservation.reservation_time}
                required
                />
                </div>
                <Link to={"/"}><button className="btn btn-secondary m-1">Cancel</button></Link>
                <button className="btn btn-primary m-1" type="submit">Submit</button>
            </form>
        </div>
    )
}