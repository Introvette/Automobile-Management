import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListModels from './inventory/ListModels';
import ListAutomobiles from './inventory/ListAutomobiles';
import ListManufacturer from './inventory/ListManufacturer';
import NewManufacturer from './inventory/NewManufacturer';
import NewAutomobile from './inventory/NewAutomobile';
import NewModel from './inventory/NewModel';
import TechnicianForm from './services/NewTechnician';

import NewAppointment from './services/NewAppointment';
import AppointmentList from './services/AppointmentList';
import ServiceHistory from './services/ServiceHistory';

import CreateCustomer from './sales/CreateCustomer';
import CreateSalesPerson from './sales/CreateSalesPerson';
import CreateSale from './sales/CreateSalesRecord';
import ListSale from './sales/ListSales';
import ListSalesPerson from './sales/ListSalesPersonHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers">
            <Route path="" element={<ListManufacturer />}/>
            <Route path="new" element={<NewManufacturer />}/>
          </Route>
          <Route path="/models">
            <Route path="" element={<ListModels />} />
            <Route path="new" element={<NewModel />} />
          </Route>
          <Route path="/automobiles">
            <Route path="" element={<ListAutomobiles />} />
            <Route path="new" element={<NewAutomobile />} />
          </Route>
          <Route path="/technician">
            <Route path="new" element={<TechnicianForm/>} />
          </Route>
          <Route path="/appointment/">
            <Route path="" element={<AppointmentList/>} />
            <Route path="new" element={<NewAppointment />} />
          </Route>
          <Route>
          <Route path="/appointment/history" element={<ServiceHistory />} />
          </Route>
          <Route path="/customer/">
            <Route path="new" element={<CreateCustomer />} />
          </Route>
          <Route path="/salesperson">
            <Route path="new" element={<CreateSalesPerson />} />
            <Route path="history" element={<ListSalesPerson />} />
          </Route>
          <Route path="/sales">
            <Route path="new" element={<CreateSale />} />
            <Route path="" element={<ListSale />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
