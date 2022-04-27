import React from "react"
import { freeTable } from "../../utils/api";

export default function SingleTable({ table, setError }) {

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const confirmed = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
            console.log("CONFIRM WINDOW", confirmed);
            if(confirmed) {
                await freeTable(table.table_id);
                window.location.reload();
            }
        }
        catch(e) {
            setError(e);
        }
    }

    return (
        <tr>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.status}</td>
            {table.status === "occupied" && (
                <td><button type="submit"
                data-table-id-finish={table.table_id}
                className="btn btn-outline-info"
                onClick={handleClick}>Finish</button></td>
            )}
        </tr>
    )
}