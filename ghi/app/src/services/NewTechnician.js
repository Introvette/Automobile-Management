import React from "react";


class TechnicianForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            name: "",
            employee_number: "",
            technicians: [],
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;


        const techniciansUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(techniciansUrl, fetchConfig);

        if (response.ok) {
            const newTechnician = await response.json();

            const cleared = {
                name: "",
                employee_number: "",
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


    render () {
        return (
            <div className='container pt-5'>
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add Technician</h1>


                        <form onSubmit={this.handleSubmit} id="create-technician-form">

                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>


                        <div className="form-floating mb-3">
                            <input onChange={this.handleInputChange} value={this.state.employee_number} placeholder="Employee Number<" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>


                        <button className="btn btn-success">Add</button>
                        </form>

                        <div className="alert alert-success d-none mt-5" id="success-message">
                            Successfully added a new technician!
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default TechnicianForm;
