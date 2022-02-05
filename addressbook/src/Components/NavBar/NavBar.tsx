import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar () {

  return (
    <div className='navbar-container'>
      <div className="navbar-links">
        <h3>
          <Link to="contacts">Contacts</Link>
        </h3>
        <h3>
          <Link to="contacts/favorites">Favorites</Link>
        </h3>
        <h3>
          <Link to="login">Login</Link>
        </h3>
      </div>
    </div>
  );
}

export default NavBar;
