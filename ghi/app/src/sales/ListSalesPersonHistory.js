import React from 'react'


class ListSalesPerson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salepersons: [],
      salerecords: [],
    }
    this.HandleSalesPerson = this.HandleSalesPerson.bind(this)
    this.HandleSaleRecord = this.HandleSaleRecord.bind(this)
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
  }

  handleSalesPersonChange(event) {
    const value = event.target.value
    this.setState({saleperson:value})
  }


  async HandleSalesPerson() {
    const salepersonURL = 'http://localhost:8090/salesperson/';
    const salespersonresponse = await fetch(salepersonURL);
    if (salespersonresponse.ok) {
      const salespersondata = await salespersonresponse.json();
      this.setState({salepersons: salespersondata.saleperson});
    }
  }


  async HandleSaleRecord() {
    const salerecordURL = 'http://localhost:8090/salerecords/'
    try {
      const salerecordRespnse = await fetch(salerecordURL)
      if (salerecordRespnse.ok) {
        const salerecordData = await salerecordRespnse.json()
        this.setState({
            salerecords: salerecordData.salerecord,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.getSaleRecordsPerPerson()
    this.getSalesPerson()
  }

  render () {
    return (
        <>
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
      <table className="table table-striped">
      <caption>Sales person history</caption>
      <thead >
        <tr>
          <th>Sale Person</th>
          <th>Customer</th>
          <th>Price</th>
          <th>VIN</th>
        </tr>
      </thead>
      <tbody>
       {this.state.salerecords.filter(
        salerecord => salerecord.saleperson.id.toString() === this.state.saleperson).map(salerecord => {
        return (
          <tr key={salerecord.id}>
            <td>{salerecord.saleperson.name}</td>
            <td>{salerecord.customer.name}</td>
            <td>{salerecord.price}</td>
            <td>{salerecord.automobile.vin}</td>
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
