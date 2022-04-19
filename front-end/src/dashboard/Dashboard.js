import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router";
import ReservationTable from "../layout/reservations/ReservationTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const searchDate = query.get("date");
  date = searchDate ? searchDate : date;
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(error => setReservationsError(error.response.data.error));
    return () => abortController.abort();
  }
  const handlePrevious = (event) => {
    history.push(`dashboard?date=${previous(date)}`);
  }
  const handleToday = (event) => {
    history.push(`dashboard?date=${today(date)}`);
  }
  const handleNext = (event) => {
    history.push(`dashboard?date=${next(date)}`);
  }
  console.log(reservations);
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <ErrorAlert error={reservationsError} />
        <div>
          <h3 className="mb-0">Reservations</h3>
          <button className="btn btn-secondary m-2" onClick={handlePrevious}>Previous</button>
          <button className="btn btn-secondary m-2" onClick={handleToday}>Today</button>
          <button className="btn btn-secondary m-2" onClick={handleNext}>Next</button>
            <ReservationTable reservations={reservations} />
          </div>
        </div>
    </main>
  );
}

export default Dashboard;
