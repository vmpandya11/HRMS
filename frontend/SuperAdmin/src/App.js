import './App.css';
import Signup from './Components/Signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRouter/ProtectedRouter';
import Updatemodal from './Components/Employee/UpdateEmployee';
import EmployeeList from './Components/Employee/EmployeeList';
import Dashbord from './Components/Dashbord/Dashbord';
import AddEmployee from './Components/Employee/AddEmployee';
import Leave from './Components/Leave/Leave'
import Holiday from './Components/Holiday/Holiday'



function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/updatemodal/:id" element={<Updatemodal />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/holiday" element={<Holiday />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/leave" element={< Leave />} />
          <Route path="/" element={<Dashbord />} />
          <Route path="/home" element={<ProtectedRoute Cmp={Home} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

