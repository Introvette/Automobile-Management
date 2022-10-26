import React from 'react'


class CreateSalesRecord extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      salepersons: [],
      customers: [],
      price: '',
      autos: [],
    }
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleAutomobileChange = this.handleAutomobileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.autos;
    delete data.customers;
    delete data.salepersons;

    const salerecordURL = 'http://localhost:8090/salerecord/new/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(salerecordURL, fetchConfig);

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
        saleperson: '',
        customer: '',
        price: '',
        automobile: '',
      }
      this.setState(cleared)
    }
  }

  async componentDidMount() {
    const salepersonURL = 'http://localhost:8090/salesperson/';
    const salespersonresponse = await fetch(salepersonURL);
    if (salespersonresponse.ok) {
      const salespersondata = await salespersonresponse.json();
      this.setState({salepersons: salespersondata.saleperson});
    }

    const customerURL = 'http://localhost:8090/customer/';
    const customerresponse = await fetch(customerURL);
    if (customerresponse.ok) {
      const customerdata = await customerresponse.json();
      this.setState({customers: customerdata.customer});
    }

    const autoURL = 'http://localhost:8100/api/automobiles/';
    const autoResponse = await fetch(autoURL);
    if (customerresponse.ok) {
      const autoData = await autoResponse.json();
      this.setState({autos: autoData.autos});
    }

  }



  handleSalesPersonChange(event) {
    const value = event.target.value
    this.setState({saleperson:value})
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


  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales record</h1>
            <p>Note: selling a car already sold will result in a 404 error and no sale record being made.</p>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
            <select onChange={this.handleSalesPersonChange} required name="saleperson" id="saleperson" value={this.state.saleperson} className="form-select">
            <option value="">Choose a Sales Person</option>
            {this.state.salepersons.map(saleperson => {
            return (
                <option key={saleperson.id} value={saleperson.id}>
                {saleperson.name}
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
                <option key={customer.id} value={customer.id}>
                {customer.name}
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
            return (
                <option key={automobile.vin} value={automobile.vin}>
                {automobile.vin}
                </option>
            );
            })}
            </select>
            </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateSalesRecord
