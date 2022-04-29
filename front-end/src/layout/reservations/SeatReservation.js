import { React, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, read, seatTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import TableOptions from "../tables/TableOptions";

export default function SeatReservation() {
    const [res, setRes] = useState({});
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState("");
    const { reservation_id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const ac = new AbortController();
        async function loadRes() {
            try {
                setError(null);
                const reservation = await read(reservation_id);
                setRes({ ...reservation });
            }
            catch(e) {
                setError(e);
            }
        }
        async function loadTables() {
            try {
                setError(null);
                const response = await listTables();
                setTables([...response]);
            }
            catch(e) {
                setError(e);
            }
        }
        loadRes();
        loadTables();
        return ac.abort();
    }, [reservation_id]);

    const handleChange = ({ target }) => {
        setSelected(Number(target.value));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            await seatTable(reservation_id, selected, ac.signal);
            history.push("/");   
        }
        catch(e) {
            setError(e);
        }
    }
    const options = tables.map((table) => (
        <TableOptions table={table} key={table.table_id} />
    ));
    return (
        <div>
            <h1 className="mt-5 pt-5 mb-4">Seat Reservation</h1>
            <ErrorAlert error={error}/>
            <h3>#{res.reservation_id} - {res.first_name} {res.last_name} on {res.reservation_date} at {res.reservation_time} for {res.people}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label" id="seat-form-label" htmlFor="table_id">Seat at:</label>
                </div>
                <div>
                    <select
                        id="seat-form-select"
                        name="table_id"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleChange}

                    >
                        <option value="" disabled selected>Select a table</option>
                        {options}
                    </select>
                </div>
                <div>
                    <button 
                        type="cancel" 
                        className="btn btn-outline-secondary m-1 mt-2" 
                        onClick={() => history.goBack()}>Cancel</button>
                    <button type="submit" className="btn btn-outline-info m-1 mt-2">Submit</button>
                </div>
            </form>
        </div>
    );
}