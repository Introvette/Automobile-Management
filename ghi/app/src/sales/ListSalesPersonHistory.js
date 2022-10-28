import React from 'react'


class ListSalesPerson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sales_people: [],
      sales_person: '',
      autosales: [],
     }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.SalesPerson = this.SalesPerson.bind(this)
    this.AutoSales = this.AutoSales.bind(this)
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
  }
  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.sales_person

    const customerUrl = 'http://localhost:8090/api/salespeople/';
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
        const cleared = {
            sales_person: '',

        }
        this.setState(cleared);
    }
  }



  handleSalesPersonChange(event) {
    const value = event.target.value
    this.setState({sales_person:value})
  }


  async SalesPerson() {
    const URL = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      this.setState({sales_people: data.salespeople});
    }
  }


  async AutoSales() {
    const URL = 'http://localhost:8090/api/autosales/';
    try {
      const Respnse = await fetch(URL)
      if (Respnse.ok) {
        const Data = await Respnse.json()
        this.setState({
            autosales: Data.autosales,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.AutoSales()
    this.SalesPerson()
  }

  render () {
    return (
        <>
        <h1>Sales person history</h1>
          <div className="form-floating mb-3">
            <form onSubmit={this.handleSubmit}>
              <select onChange={this.handleSalesPersonChange} required name="saleperson" id="saleperson" value={this.state.sales_person} className="form-select">
              <option value="">Choose a Sales Person</option>
              {this.state.sales_people.map(sale => {
                return (
                  <option key={sale.id} value={sale.id}>
                  {sale.sales_person}
                  </option>
              );
            })}
            </select>
            </form>
          </div>
            <table className="table table-striped">
              <thead >
                <tr>
                  <th>Sales person</th>
                  <th>Customer</th>
                  <th>VIN</th>
                  <th>Sale price</th>
                </tr>
              </thead>
            <tbody>
              {this.state.autosales.filter(
                sale => sale.sales_person.id.toString() === this.state.sales_person).map(sale => {
                  return (
                    <tr key={sale.id}>
                      <td>{sale.sales_person.sales_person}</td>
                      <td>{sale.customer.customer}</td>
                      <td>{sale.automobile.vin}</td>
                      <td>{"$" + sale.price}</td>
                    </tr>
                  )
                })
              }
            </tbody>
            </table>
          </>
        )
      }
  }
export default ListSalesPerson
