import React from 'react'
import Button from 'react-bootstrap/Button';


class NewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            name: "",
            picture_Url: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.manufacturer_id = data.manufacturer;

        delete data.manufacturers;
        delete data.manufacturer;
        delete data.picture_Url;
        const url = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const cleared = {
                name: "",
                picture_Url: "",
                manufacturer: "",
            }
            this.setState(cleared)
        }
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }
    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({picture_Url: value});
    }
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value});
    }
    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        } else {
            console.error("invalid request")
        }
    }
    render () {
        return (
            <div className='container pt-5'>
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Create a vehicle model</h1>
                    <form onSubmit={this.handleSubmit} id="addModelForm">
                        <div className="form-floating mb-3">
                            <input
                                className="form-control" required type="text"
                                onChange={this.handleNameChange} id="name"
                                placeholder="name" value={this.state.name}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                className="form-control" required type="text"
                                onChange={this.handlePictureChange} id="pictureUrl"
                                name="pictureUrl" value={this.state.picture_Url}
                                placeholder="pictureUrl"
                            />
                            <label htmlFor="pictureUrl">Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-select" required id="manufacturer"
                                onChange={this.handleManufacturerChange} name="manufacturer"
                                placeholder="manufacturer" value={this.state.manufacturer}
                            >
                                <option value="">Choose One</option>
                                {this.state.manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <Button className="btn btn-primary bg-success">Create</Button>
                    </form>
                </div>
            </div>
        </div>
        )
    };
}
export default NewModel;
