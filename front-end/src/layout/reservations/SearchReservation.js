import React, { useState } from "react";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationTable from "./ReservationTable";

export default function SearchReservation() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = ({ target }) => {
        setMobileNumber(target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        setError(null);
        try {
            const resList = await listReservations( {mobile_number: mobileNumber}, ac.signal);
            setReservations(resList);
            setMobileNumber("");
        } catch(e) {
            setError(e);
        }
    }

    return (
        <div className="container">
            <h1 className="m-3 mt-5 pt-5">Search Reservations</h1>
            <div>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-item">
                    <input
                    type="text"
                    name="mobile_number"
                    className="search"
                    value={mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                    />
                    <button type="submit" className="btn btn-outline-info m-1">Search</button>
                </div>
            </form>
        </div>
            <ErrorAlert error={error} />
            {reservations.length < 1 && <h6>No reservations found.</h6>}
            {reservations.length >= 1 && 
            <div>
                <ReservationTable reservations={reservations} setError={setError}/>
            </div>}
        </div>

    );
}