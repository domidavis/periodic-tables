import { React, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function SeatReservation() {
    const [ tables, setTables ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ selected, setSelected ] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setError(null);
        async function listTables() {
            try {
                const response = await listTables();
                setTables(response);
                setSelected(response[0].table_id)
            }
            catch(e) {
                setError(e);
            }
        }
        listTables();
    }, []);

    const handleChange = ({ target }) => {
        setSelected(Number(target.value));
    }

    // const options = tables.map((table) => {
    //     <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
    // });
    return (
        <div>
            <h1>Seat Reservation</h1>
        </div>
    );
}