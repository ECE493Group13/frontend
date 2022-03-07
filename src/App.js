import './App.css';
import {LoginPage} from './Pages/LoginPage';
import {HomePage} from './Pages/HomePage';
import {ChangePasswordPage} from './Pages/ChangePasswordPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RequestAccountPage } from './Pages/RequestAccountPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/changePassword' element={<ChangePasswordPage/>} />
          <Route exact path='/home' element={<HomePage/>} />
          <Route exact path='/requestAccount' element={<RequestAccountPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
