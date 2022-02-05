import './NavBar.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/Context';
import { Link } from 'react-router-dom';

function NavBar () {

  const { user, setUser } = useContext(UserContext);

  function logout () {
    setUser({email: '', password: ''});
  }

  return (
    <div className='navbar-container'>
      <div className="navbar-links">
        <h3>
          <Link to="contacts">Contacts</Link>
        </h3>
        <h3>
          <Link to="contacts/favorites">Favorites</Link>
        </h3>
        {user.email ?
        <h3>
          <Link to="/" onClick={() => logout()}>Logout</Link>
        </h3>
        :
        <h3>
          <Link to="login">Login</Link>
        </h3>
        }
      </div>
    </div>
  );
}

export default NavBar;
