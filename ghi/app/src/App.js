import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListModels from './inventory/ListModels';
import ListAutomobiles from './inventory/ListAutomobiles';
import ListManufacturer from './inventory/ListManufacturer';
import NewManufacturer from './inventory/NewManufacturer';
import NewAutomobile from './inventory/NewAutomobile';
import NewModel from './inventory/NewModel';


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

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
