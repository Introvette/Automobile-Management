import React from 'react';
import { Link } from 'react-router-dom'

class ListModels extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        modelColumns: [[], [], []],
    };
}
async componentDidMount() {
    const url = "http://localhost:8100/api/models/";
    try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          const requests = [];
          const modelColumns = [[], [], []];
          let i = 0
          for (let model of data.models) {
            const addonsUrl = `http://localhost:8100/api/models/${model.id}/addons/`
            const addonsResponse = await fetch(addonsUrl);
            if (addonsResponse.ok) {
              const addons = await addonsResponse.json()
              model["addons"] = addons.addons
              modelColumns[i].push(model)
              i = i + 1
              if (i > 2) {
                i = 0
              }
            } else {
              console.error(addonsResponse)
            }
          }
          this.setState({modelColumns: modelColumns})
        }
      } catch (e) {
        console.error(e)
      }
    }


render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid">
            <p></p>
          <h2 className="display-6 fw-bold">Vehicle Models</h2>
          <div>
            <p className="lead mb-4">
                Find the vehicle for you!
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.state.modelColumns.map((list, key) => {
              return (
                <div className="col" key={key}>
                {list.map(model => {
                  {const addons = model.addons ?
                    <li className="list-group-item">
                      {model.addons.length} available addons
                    </li>
                    :
                  null
                  }
                  return (
                    <div key={model.id} className="card mb-3 shadow " >
                    {/* <div key={model.id} className="w-auto p-3" > */}
                      <img src={model.picture_url} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{model.manufacturer.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{model.name}</h6>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Starting MSRP: ${ new Intl.NumberFormat().format(model.base_price) }</li>


                        { model.addons.length > 0 ?
                          <li className="list-group-item">
                            + {model.addons.length} available add-on{model.addons.length > 1 ? "s" : null}
                          </li>
                        :
                        null
                        }


                        {/* {model.addons.map((addon) => {
                          return (
                            <li className="list-group-item" key={addon.id}>{addon.name}: ${new Intl.NumberFormat().format(addon.price)}</li>
                          )
                        }
                        )} */}


                      </ul>
                      <div className="card-body">
                          <a href="/automobiles" className="btn btn-dark">Explore</a>
                      </div>
                    </div>
                  )
                })}
                </div>
              )
            })}
          </div>
        </div>
      </>
    );
  }

}

export default ListModels;
