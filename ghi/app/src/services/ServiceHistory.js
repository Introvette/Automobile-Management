import React, { useState, useEffect } from "react";


function ServiceHistory() {
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        const appointmentData = async () => {
            const response = await fetch("http://localhost:8080/api/appointments/");
            const data = await response.json();
            setAppointments(data.appointments.filter(appointment => appointment.finished === true));
            setFilteredAppointments(data.appointments.filter(appointment => appointment.finished === true));
        }
        appointmentData()
    },[])

    const handleInputChange = (event) => {
        let search = event.target.value;
        let appointmentMatches = [];

        appointments.forEach(appointment => {
            if (appointment.vin.includes(search) || appointment.customer_name.includes(search) || appointment.technician.name.includes(search)) {
                appointmentMatches.push(appointment);
            }
        });
        setFilteredAppointments(appointmentMatches);
    }


    if (filteredAppointments.length === 0) {
        return (
            <div>
                <form onSubmit={event => {event.preventDefault()}} id="search-vin-form">
                    <div className="input-group mb-3 p-4">
                        <input onChange={handleInputChange} className="form-control" name="searchVIN" id="searchVIN" type="search" placeholder="Search"/>
                    </div>
                </form>
                <h1>Service Appointments History</h1>
                <p>No appointments were found for the VIN you searched</p>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <form onSubmit={event => {event.preventDefault()}} id="search-vin-form">
                    <div className="input-group mb-3 p-4">
                        <input onChange={handleInputChange} className="form-control" name="searchVIN" id="searchVIN" type="search" placeholder="Search"/>
                    </div>
                </form>
                <h1>Service Appointments History</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Technician</th>
                                <th>VIP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map(appointment => {
                                return (
                                    <tr key={ appointment.id }>
                                        <td>{ appointment.vin }</td>
                                        <td>{ appointment.customer_name }</td>
                                        <td>{ appointment.date }</td>
                                        <td>{ appointment.time }</td>
                                        <td>{ appointment.reason }</td>
                                        <td>{ appointment.technician.name }</td>
                                        { appointment.vip && <td>Yes</td> }
                                        { !appointment.vip && <td>No</td> }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        )
    }
}


export default ServiceHistory
