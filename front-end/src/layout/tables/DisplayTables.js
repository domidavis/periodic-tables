import React from "react";
import SingleTable from "./SingleTable";

export default function DisplayTables({ tables, setError }) {
    const list = tables.map((table) => <SingleTable key={table.table_id} table={table} setError={setError}/>);
    return (
        <div className="mt-5">
            <h3>Tables</h3>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TABLE NAME</th>
                        <th scope="col">CAPACITY</th>
                        <th scope="col">Free?</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    );
}