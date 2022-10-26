import React from "react";


class NewAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: "",
            customer_name: "",
            date: "",
            time: "",
            reason: "",
            technician: "",
            technicians: [],
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;

        const appointmentsUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
             },
        };
        const response = await fetch(appointmentsUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();

            const cleared = {
                vin: "",
                customer_name: "",
                date: "",
                time: "",
                reason: "",
                technician: "",
            };
            this.setState(cleared);
            const successAlert = document.getElementById("success-message")
            successAlert.classList.remove("d-none")
        }
    }


    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({...this.state, [name]: value})
    }


    async componentDidMount() {
        const technicianUrl = "http://localhost:8080/api/technicians/";
        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians})
        }
    }


    render() {
        return (
            <div className='container pt-5'>
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Schedule an Appointment</h1>


                        <form onSubmit={this.handleSubmit} id="create-appointment-form">

                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                            <label htmlFor="vin">VIN</label>
                        </div>


                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.customer_name} placeholder="Customer Name<" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                            <label htmlFor="customer_name">Customer Name</label>
                        </div>


                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                            <label htmlFor="date">Date</label>
                        </div>


                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                            <label htmlFor="time">Time</label>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">Reason</label>
                            <textarea onChange={this.handleInputChange} value={this.state.reason} className="form-control" name="reason" id="reason" rows="3"></textarea>
                        </div>


                        <div className="mb-3">
                            <select onChange={this.handleInputChange} value={this.state.technician} required id="technician" name="technician" className="form-select">
                            <option value="">Choose a technician</option>

                            {this.state.technicians.map(technician => {
                                return (
                                    <option key={technician.id} value={technician.id}>
                                        {technician.name}
                                    </option>
                                )
                            })}

                            </select>
                        </div>
                        <button className="btn btn-success">Schedule</button>
                        </form>

                        <div className="alert alert-success d-none mt-5" id="success-message">
                            Successfully scheduled a new appointment!
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default NewAppointment;
