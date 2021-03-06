import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router";
import ReservationTable from "../layout/reservations/ReservationTable";
import DisplayTables from "../layout/tables/DisplayTables";

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

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(error => setReservationsError(error));
    return () => abortController.abort();
  }

  useEffect(() => {
    setTablesError(null);

    async function loadTables() {
      try {
        const teebles = await listTables();
        setTables(teebles);
      }
      catch(e) {
        setTablesError(e);
      }
    }
    loadTables();
  }, []);

  const handlePrevious = (event) => {
    history.push(`dashboard?date=${previous(date)}`);
  }
  const handleToday = (event) => {
    history.push(`dashboard?date=${today(date)}`);
  }
  const handleNext = (event) => {
    history.push(`dashboard?date=${next(date)}`);
  }

  return (
    <main className="m-3 mt-5 pt-5">
      <h1>Dashboard</h1>
      <div>
        <ErrorAlert error={reservationsError} />
        <div>
          <div id="button-div">
            <button className="btn btn-info m-2" onClick={handlePrevious}>&#8249;</button>
            <button className="btn btn-info m-2" onClick={handleToday}>Today</button>
            <button className="btn btn-info m-2" onClick={handleNext}>&#8250;</button>
          </div>
          <h5 className="mt-5 pl-2">Reservations for {date}</h5>
            <ReservationTable reservations={reservations} setError={setReservationsError}/>
          <div className="mt-3 px-5">
            <ErrorAlert error={tablesError} />
            <DisplayTables tables={tables} setError={setTablesError}/>
          </div>
          </div>
        </div>
    </main>
  );
}

export default Dashboard;
