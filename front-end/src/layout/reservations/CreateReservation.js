import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function CreateReservation() {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        people: 1,
        reservation_date: "",
        reservation_time: "",
    });
    const handleChange = ({ target }) => {
        if (target.name === "people") {
            setReservation({
                ...reservation,
                [target.name]: parseInt(target.value),
            });
        } else {
            setReservation({
                ...reservation,
                [target.name]: target.value,
            });
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrors(null);
            await createReservation(reservation);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        }
        catch(e) {
            setErrors(e);
        }

    };

    return (
        <div>
            <ErrorAlert error={errors} />
            <h1>Create Reservation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="first_name"
                className="form-label">First name</label>
                <input
                id="first_name"
                className="form-control"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                onChange={handleChange}
                />
                <label htmlFor="last_name"
                className="form-label">Last name</label>
                <input
                id="last_name"
                className="form-control"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                onChange={handleChange}
                required
                />
                <label htmlFor="mobile_number"
                className="form-label">Mobile number</label>
                <input
                id="mobile_number"
                className="form-control"
                type="tel"
                name="mobile_number"
                onChange={handleChange}
                required
                />
                <label htmlFor="people"
                className="form-label">People</label>
                <input
                id="people"
                className="form-control"
                type="number"
                name="people"
                onChange={handleChange}
                required
                />
                <label htmlFor="reservation_date"
                className="form-label">Reservation date</label>
                <input
                id="reservation_date"
                className="form-control"
                type="date"
                name="reservation_date"
                onChange={handleChange}
                required
                />
                <label htmlFor="reservation_time"
                className="form-label">Reservation time</label>
                <input
                id="reservation_time"
                className="form-control"
                type="time"
                name="reservation_time"
                onChange={handleChange}
                required
                />
                </div>
                <Link to={"/"}><button className="btn btn-secondary m-1">Cancel</button></Link>
                <button className="btn btn-primary m-1" type="submit">Submit</button>
            </form>
        </div>
    );
}