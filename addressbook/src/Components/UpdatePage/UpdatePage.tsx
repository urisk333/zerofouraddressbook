import './UpdatePage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import fireDB from 'Firebase/Firebase';
import { Contact } from 'Types/Types';
import { toast } from 'react-toastify';

const initialState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  mobilePhone: '',
  homePhone: '',
  email: '',
  pager: '' 
}

function UpdatePage () {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [email, setEmail] = useState('');
  const [pager, setPager] = useState('');
  const [radio, setRadio] = useState('');
  const [edit, setEdit] = useState<Contact>(initialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEdit({...edit[id]})
    } else {
      setEdit({...initialState})
    }

    return () => {
      setEdit({...initialState})
    }
  }, [id]);

  function handleSaveButton (e: React.SyntheticEvent) {
    e.preventDefault();

    if (!(firstName && lastName && dateOfBirth && mobilePhone && homePhone && email && pager)) {
      return alert('Please edit all fields.');
    } else {
      fireDB.child('contacts/' + id).set({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        mobilePhone: mobilePhone,
        homePhone: homePhone,
        email: email,
        pager: pager,
      }, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Contact edited!');
        }
      });
    } 
    setEdit({firstName, lastName, dateOfBirth, mobilePhone, homePhone, email, pager});
    navigate('/contacts');
  }

  return (
    <div className="update-list-container">
      <div className="update-form">
        <form className="update-input-form">
          <h2 className="update-form-title">Update contact</h2> 
          <div className="input-order">
            <label className="add-label">First name:</label>
            <input 
              className="update-input-information" 
              type="text" 
              placeholder="Enter first name..." 
              maxLength={20} 
              value={firstName || ""} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}>
            </input>     
          </div>
          <div className="input-order">
            <label className="add-label">Last name:</label>
            <input 
              className="update-input-information" 
              type="text" 
              placeholder="Enter last name..." 
              maxLength={30} 
              value={lastName || ""} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}>
            </input>
          </div>
          <div className="input-order">
            <label className="add-label">Date of birth:</label>
            <input 
              className="update-input-information" 
              type="datetime-local" 
              max={new Date().toISOString().slice(0, -8)} 
              placeholder="Enter date of birth..." 
              value={dateOfBirth || ""} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}>
            </input>     
          </div>
          <div className="input-order-update">
            <div className="input-order-update-title">
              <label className="add-label">Type of contact:</label>
            </div>
            <div className="input-update-radio">
              <input 
                type="radio" 
                id="contactChoice1" 
                name="contact" 
                value="mobile" 
                checked={radio === 'mobile'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
              </input>
              <label className="radio-label" htmlFor="contactChoice1">Mobile</label>
              <input 
                type="radio" 
                id="contactChoice2" 
                name="contact" 
                value="phone" 
                checked={radio === 'phone'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
              </input>
              <label className="radio-label" htmlFor="contactChoice2">Home</label>
              <input 
                type="radio" 
                id="contactChoice3" 
                name="contact" 
                value="email" 
                checked={radio === 'email'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
              </input>
              <label className="radio-label" htmlFor="contactChoice3">Email</label>
              <input 
                type="radio" 
                id="contactChoice4" 
                name="contact" 
                value="pager" 
                checked={radio === 'pager'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
              </input>
              <label className="radio-label" htmlFor="contactChoice4">Pager</label>
            </div>

            {radio === 'mobile' &&
              <input 
                className="update-input-information" 
                type="number" 
                placeholder="Enter mobile phone..." 
                defaultValue={mobilePhone} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobilePhone(e.target.value)}>
              </input>}

            {radio === 'phone' && 
            <input 
              className="update-input-information" 
              type="number" 
              placeholder="Enter home phone..." 
              defaultValue={homePhone} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHomePhone(e.target.value)}>
            </input>}

            {radio === 'email' && 
            <input 
              className="update-input-information" 
              type="text" 
              placeholder="Enter email..." 
              defaultValue={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}>
            </input>}

            {radio === 'pager' &&
            <input 
              className="update-input-information" 
              type="number" 
              placeholder="Enter pager..." 
              defaultValue={pager} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPager(e.target.value)}>
            </input>}  
          </div> 
          <div className="update-button-container">
            <button className="update-contact-button" type="submit" onClick={handleSaveButton}>Update</button>
            <Link to={'/contacts'}>
              <button className="update-contact-button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>   
  );
}

export default UpdatePage;
