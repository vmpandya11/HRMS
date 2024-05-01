import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRouter/ProtectedRouter';
import Dashbord from './Components/Dashbord/Dashbord';
import Company from './Components/Company/Company';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Wrap Routes with I18nextProvider */}
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company" element={<Company />} />
            <Route path="/" element={<Dashbord />} />
            <Route path="/home" element={<ProtectedRoute Cmp={Home} />} />
          </Routes>
        </I18nextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
