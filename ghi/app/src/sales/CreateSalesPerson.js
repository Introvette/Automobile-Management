import React from 'react'


class CreateSalesPerson extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sales_person: '',
      employee_number: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const URL = 'http://localhost:8090/api/salespeople/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(URL, fetchConfig);
    if (response.ok) {
      const cleared = {
        sales_person: '',
        employee_number: '',
      }
      this.setState(cleared)
    }
  }


  handleNameChange(event) {
    const value = event.target.value
    this.setState({sales_person:value})
  }

  handleNumberChange(event) {
    const value = event.target.value
    this.setState({employee_number:value})
  }


  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales person</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.sales_person} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleNumberChange} placeholder="Number" required type="text" name="number" id="number" className="form-control" value={this.state.employee_number} />
                <label htmlFor="number">Enployee number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateSalesPerson
