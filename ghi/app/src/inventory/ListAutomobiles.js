import React from 'react';


function ListAutomobiles() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const url = "http://localhost:8100/api/automobiles/";
        fetch(url)
        .then((response)=> response.json())
        .then((json)=> setData(json['autos']))
        .catch((error) => console.log(error));
    }, []);
    React.useEffect(()=> {

    }, [data]);

    return (
        <div>
            <p></p>
            <h2>Automobiles</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>

                        {data.map(automobile => {
                            if(automobile.sold === false) {
                                return (
                                    <tr key={automobile.id}>
                                        <td>{automobile.vin}</td>
                                        <td>{automobile.color}</td>
                                        <td>{automobile.year}</td>
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.model.manufacturer.name}</td>
                                    </tr>
                                );
                            }
                            })}
                    </tbody>
            </table>
        </div>
    );
}

export default ListAutomobiles;
