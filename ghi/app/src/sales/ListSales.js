import React from 'react'


class ListSale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salerecords: [],
    }
    this.getSaleRecords = this.getSaleRecords.bind(this)
  }


  async getSaleRecords() {
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
    this.getSaleRecords()
  }

  render () {
    return (
      <table className="table table-striped">
      <caption>List of sale records</caption>
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
       {this.state.salerecords.map(salerecord => {
        return (
          <tr key={salerecord.id}>
            <td>{salerecord.saleperson.name}</td>
            <td>{salerecord.saleperson.number}</td>
            <td>{salerecord.customer.name}</td>
            <td>{salerecord.price}</td>
            <td>{salerecord.automobile.vin}</td>
          </tr>
        )
       })}
      </tbody>
    </table>
    )
  }
}
export default ListSale
