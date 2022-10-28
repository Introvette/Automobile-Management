import React, { useState, useEffect } from 'react';

const ServiceHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [Results, setResults] = useState([])

  const Appointments = async () => {
    let response = await fetch('http://localhost:8080/api/appointment/')
    let data = await response.json()
    setAppointments(data.appointments)
    setResults(data.appointments)
  };

  useEffect(() => {
    Appointments()
  }, [])

  useEffect(
    () => {
      if (search) {
        let filteredData = appointments.filter(appointment => appointment.vin.includes(search))
        setResults(filteredData);
      } else{
        setResults(appointments)
      }
    }, [search]
  )

  return (
    <>
      <form className="mx-2 my-auto d-inline w-100">

        <input type="text" className="form-control border border-right-0" placeholder="Enter VIN Number" onChange={(e) => setSearch(e.target.value)} />

      </form>
      <h1 style={{fontSize: "30px"}} style={{color: 'gray'}}>Service History</h1>
      <table className='table table-striped' style={{fontSize: "14px"}}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {Results.map(appointment => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.owner}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.technician.name} / Technician ID: {appointment.technician.id}</td>
                <td>{appointment.reason}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ServiceHistory;
