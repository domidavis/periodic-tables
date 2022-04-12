import React, { useState, useEffect } from "react";
import { createReservation } from "./utils/api";
import { useHistory } from "react-router-dom";

export default function CreateReservation() {
    const history = useHistory();
    const [ reservation, setReservation ] = useState({});

    <input onChange={(e) => setReservation({...reservation, firstName: e.target.value})}/>
}