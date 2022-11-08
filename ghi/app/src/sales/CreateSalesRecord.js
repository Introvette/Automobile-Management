import React from 'react'


class CreateSalesRecord extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sales_persons: [],
      sales_person: '',
      customers: [],
      customer: '',
      price: '',
      autos: [],
    }
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleAutomobileChange = this.handleAutomobileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSalesPersonChange(event) {
    const value = event.target.value
    this.setState({sales_person:value})
  }

  handleCustomerChange(event) {
    const value = event.target.value
    this.setState({customer:value})
  }

  handlePriceChange(event) {
    const value = event.target.value
    this.setState({price:value})
  }

  handleAutomobileChange(event) {
    const value = event.target.value
    this.setState({automobile:value})
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.autos;
    delete data.customers;
    delete data.sales_persons;

    const salerecordURL = 'http://localhost:8090/api/autosales/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(salerecordURL, fetchConfig);
console.log(data)
    const automobileURL = `http://localhost:8100/api/automobiles/${this.state.automobile}/`;
    const autofetchConfig = {
      method: "PUT",
      body: JSON.stringify({ sold: true}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const autoResponse = await fetch(automobileURL, autofetchConfig);
    if (autoResponse.ok) {
    } else {
      console.error(autoResponse);
    }

    if (response.ok) {
      const cleared = {
        sales_person: '',
        customer: '',
        price: '',
        automobile: '',
      }
      this.setState(cleared)
      const successAlert = document.getElementById("success-message")
      successAlert.classList.remove("d-none")
    }
  }

  async componentDidMount() {
    const URL = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      this.setState({sales_persons: data.salespeople});
    }

    const customerURL = 'http://localhost:8090/api/customers/';
    const customerresponse = await fetch(customerURL);
    if (customerresponse.ok) {
      const customerdata = await customerresponse.json();
      this.setState({customers: customerdata.customers});
    }

    const autoURL = 'http://localhost:8100/api/automobiles/';
    const autoResponse = await fetch(autoURL);
    if (customerresponse.ok) {
      const autoData = await autoResponse.json();
      this.setState({autos: autoData.autos});
    }

  }


  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create">
            <div className="form-floating mb-3">
            <select onChange={this.handleSalesPersonChange} required name="saleperson" id="saleperson" value={this.state.sales_person} className="form-select">
            <option value="">Choose a Sales Person</option>
            {this.state.sales_persons.map(sale => {
            return (
                <option key={sale.id} value={sale.id}>
                {sale.sales_person}
                </option>
            );
            })}
            </select>
            </div>
            <div className="form-floating mb-3">
            <select onChange={this.handleCustomerChange} required name="customer" id="customer" value={this.state.customer} className="form-select">
            <option value="">Choose a Customer</option>
            {this.state.customers.map(customer => {
            return (
                <option key={customer.id} value={customer.customer}>
                {customer.customer}
                </option>
            );
            })}
            </select>
            </div>
            <div className="form-floating mb-3">
            <input onChange={this.handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" value={this.state.price} />
            <label htmlFor="style">Price</label>
            </div>
            <div className="form-floating mb-3">
            <select onChange={this.handleAutomobileChange} required name="automobile" id="automobile" value={this.state.automobile} className="form-select">
            <option value="">Choose a Automobile</option>
            {this.state.autos.map(automobile => {
              if (automobile.sold === false){
              return (
                <option key={automobile.vin} value={automobile.vin}>
                {automobile.vin}
                </option>
              )};
          })}
            </select>
            </div>
              <button className="btn btn-success">Create</button>
            </form>
            <div className="alert alert-success d-none mt-3" id="success-message">
              Congrats on the new sales!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateSalesRecord
