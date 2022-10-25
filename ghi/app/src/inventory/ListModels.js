import React from 'react'


class VehicleModels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      models: [],
    }
    this.getModel = this.getModel.bind(this)
  }


  async getModel() {
    const vehicleURL = 'http://localhost:8100/api/models/'
    try {
      const modelResponse = await fetch(vehicleURL)
      if (modelResponse.ok) {
        const modelData = await modelResponse.json()
        this.setState({
            models: modelData.models,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.getModel()
  }

  render () {
    return (
      <div>
      <h2>Vehicle models </h2>
      <table className="table table-striped table-hover table-bordered">
      <thead >
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
       {this.state.models.map(model => {
        return (
          <tr key={model.id}>
            <td>{model.name}</td>
            <td>{model.manufacturer.name}</td>
            <td><img src={model.picture_url} alt="car" width="259" height="180"/>
            </td>
          </tr>
        )
       })}
      </tbody>
    </table>
    </div>
    )
  }
}
export default VehicleModels
