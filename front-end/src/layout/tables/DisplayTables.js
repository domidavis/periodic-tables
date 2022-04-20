import React from "react";
import SingleTable from "./SingleTable";

export default function DisplayTables({ tables }) {
    const list = tables.map((table) => <SingleTable table={table} />);
    return (
        <div>
            <table className="table">
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