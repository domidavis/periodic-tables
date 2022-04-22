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

  console.log(reservations);
  console.log(tables);
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <ErrorAlert error={reservationsError} />
        <div>
          <h3 className="mb-0">Reservations for {date}</h3>
          <button className="btn btn-secondary m-2" onClick={handlePrevious}>Previous</button>
          <button className="btn btn-secondary m-2" onClick={handleToday}>Today</button>
          <button className="btn btn-secondary m-2" onClick={handleNext}>Next</button>
            <ReservationTable reservations={reservations} setError={setReservationsError}/>
          <div className="mt-">
          <h2>Tables</h2>
            <ErrorAlert error={tablesError} />
            <DisplayTables tables={tables} setError={setTablesError}/>
          </div>
          </div>
        </div>
    </main>
  );
}

export default Dashboard;
