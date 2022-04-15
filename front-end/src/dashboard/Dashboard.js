import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { next, previous, today } from "../utils/date-time";
import { useHistory } from "react-router";
import Reservation from "../layout/Reservation";

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
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const list = reservations.map((res) => <Reservation key={res.reservation_id} reservation={res}/>);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <ErrorAlert error={reservationsError} />
        <h4 className="mb-0">Reservations</h4>
      </div>
      <div>{list}</div>
    </main>
  );
}

export default Dashboard;
