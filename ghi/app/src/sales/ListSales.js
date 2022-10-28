import React from 'react'


class ListSale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autosales: [],
    }
    this.getSale = this.getSale.bind(this)
  }


  async getSale() {
    const saleURL = 'http://localhost:8090/api/autosales/'
    try {
      const Respnse = await fetch(saleURL)
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
    this.getSale()
  }

  render () {
    return (
      <table className="table table-striped">
      <thead >
        <tr>
          <th>Sale Person</th>
          <th>Employee Number</th>
          <th>Customer</th>
          <th>Price</th>
          <th>VIN</th>
        </tr>
      </thead>
      <tbody>
       {this.state.autosales.map(sale => {
        return (
          <tr key={sale.id}>
            <td>{sale.sales_person.sales_person}</td>
            <td>{sale.sales_person.employee_number}</td>
            <td>{sale.customer.customer}</td>
            <td>{"$" + sale.price}</td>
            <td>{sale.automobile.vin}</td>
          </tr>
        )
       })}
      </tbody>
    </table>
    )
  }
}
export default ListSale
