import React from "react"

export default function SingleTable({ table }) {
    return (
        <tr>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.status}</td>
        </tr>
    )
}