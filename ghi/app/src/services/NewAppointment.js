import React, { Component } from 'react'


export default class AppointmentForm extends Component {
    constructor() {
        super();
        this.state = {
            vin: '',
            owner: '',
            date: '',
            time: '',
            technician: '',
            technicians: [],
            reason: '',
            successClass: "alert alert-success d-none",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.timer = this.timer.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.successClass;
        delete data.technicians;
        console.log(data);

        const appointmentUrl = 'http://localhost:8080/api/appointment/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            const cleared = {
                vin: '',
                owner: '',
                date: '',
                time: '',
                technician: '',
                reason: '',
                successClass: "alert alert-success",
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technician/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }

    timer() {
        setTimeout(() => {
            return this.setState({ successClass: "alert alert-success d-none" });;
        }, 4000);
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.vin} onChange={this.handleChange} placeholder="VIN" required type="int" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.owner} onChange={this.handleChange} placeholder="Name" required type="text" name="owner" id="owner" className="form-control" />
                                <label htmlFor="owner">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.date} onChange={this.handleChange} placeholder="Date" required type="text" name="date" id="date" className="form-control" />
                                <label htmlFor="date">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.time} onChange={this.handleChange} placeholder="Time" required type="text" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.technician} onChange={this.handleChange} placeholder="Technician" required type="text" name="technician" id="technician" className="form-control">
                                    <option value="">Technician</option>
                                    {this.state.technicians?.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.name} / {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.reason} onChange={this.handleChange} placeholder="Oil change, inspection, etc..." required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason for visit</label>
                            </div>
                            <div className={this.state.successClass} id="success-alert">
                                Appointment Added
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
