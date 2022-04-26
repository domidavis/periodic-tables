import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";


export default function CreateTable() {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [table, setTable] = useState({
        table_name: "",
        capacity: "",
    });

    const handleChange = ({ target }) => {
        if (target.name === "capacity") {
            setTable({
                ...table,
                [target.name]: parseInt(target.value),
            });
        } else {
            setTable({
                ...table,
                [target.name]: target.value,
            })
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrors(null);
            await createTable(table);
            history.push("/");
        }
        catch(e) {
            setErrors(e);
        }
    };

    return (
        <div className="container-fluid mt-2">
            <ErrorAlert error={errors} />
            <h1>Create Table</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="table_name" className="form-label">Table Name</label>
                    <input 
                    id="table_name"
                    className="form-control"
                    type="text"
                    name="table_name"
                    placeholder="Enter a name for the table"
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input 
                    id="capacity"
                    className="form-control"
                    type="number"
                    name="capacity"
                    placeholder="1"
                    onChange={handleChange}
                    required
                    />
                </div>
                <button
                className="btn btn-outline-secondary m-1"
                onClick={history.goBack}>Cancel</button>
                <button type="submit" className="btn btn-outline-info m-1">Submit</button>
            </form>
        </div>
    );
}