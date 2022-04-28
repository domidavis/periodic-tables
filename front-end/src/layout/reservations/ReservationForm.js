import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createReservation, read, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { formatAsDate } from "../../utils/date-time";

export default function ReservationForm() {
    const { reservation_id } = useParams();
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

    useEffect(() => {
        const ac = new AbortController();
        async function loadReservation() {
            try {
                const loadedRes = await read(reservation_id, ac.signal);
                setReservation({
                    ...loadedRes,
                    "people": parseInt(loadedRes.people),
                    "reservation_date": formatAsDate(loadedRes.reservation_date)
                });
            } catch(e) {
                setErrors(e);
            }
        }
        if (reservation_id) loadReservation();
        return () => ac.abort;
    }, [reservation_id]);


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
            if (reservation_id) {
                await updateReservation(reservation);
            } else {
                await createReservation(reservation);
            }
            setErrors(null);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        }
        catch(e) {
            setErrors(e);
        }

    };

    return (
        <div>
            <ErrorAlert error={errors} />
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
                value={reservation.first_name}
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
                value={reservation.last_name}
                required
                />
                <label htmlFor="mobile_number"
                className="form-label">Mobile number</label>
                <input
                id="mobile_number"
                className="form-control"
                type="tel"
                name="mobile_number"
                placeholder="000-000-0000"
                onChange={handleChange}
                value={reservation.mobile_number}
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
                value={reservation.people}
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
                value={reservation.reservation_date}
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
                value={reservation.reservation_time}
                required
                />
                </div>
                <Link to={"/"}><button type="button" className="btn btn-outline-secondary m-1">Cancel</button></Link>
                <button className="btn btn-outline-info m-1" type="submit">Submit</button>
            </form>
        </div>
    );
}