import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from 'react';
import Dashboard from 'Components/Dashboard/Dashboard';
import NavBar from 'Components/NavBar/NavBar';
import LoginForm from 'Components/LoginForm/LoginForm';
import ContactList from 'Components/ContactList/ContactList';
import ContactItem from 'Components/ContactItem/ContactItem';
import FavoriteList from 'Components/FavoriteList/FavoriteList';
import mocks from '../src/Mocks/Mocks';
import { UserContext } from 'Context/Context';
import { User, LoginData } from '../src/Types/Types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialUser = {
  email: '',
  password: ''
};

function App () {

  const [user, setUser] = useState<User>(initialUser);

  const providerUser = useMemo(() => ({user, setUser}), [user, setUser]);

  const userLogin = (loginData: LoginData) => {
    if (loginData.email == mocks.userData.email && loginData.password == mocks.userData.password) {
      setUser({email: loginData.email, password: loginData.password});
    }   
  }

  useEffect(() => {
    setUser(user)
  }, [user]);
 
  return (
    <div className="App">
      <UserContext.Provider value={providerUser}>
        <Router>
          <NavBar />
          <ToastContainer position='top-center'autoClose={5000} pauseOnHover />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginForm userLogin={userLogin} />} />
            <Route path='/contacts' element={<ContactList />} />
            <Route path='/contacts/:id' element={<ContactItem />} />
            <Route path='/contacts/favorites' element={<FavoriteList />} />
          </Routes>
        </Router> 
      </UserContext.Provider> 
    </div>
  );
}

export default App;
