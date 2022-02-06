import './ContactList.css';
import { useState, useEffect, useContext } from 'react';
import fireDB from 'Firebase/Firebase';
import { InitialData } from 'Types/Types';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

function ContactList () {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [email, setEmail] = useState('');
  const [pager, setPager] = useState('');
  const [radio, setRadio] = useState('');
  const [contact, setContact] = useState<InitialData>({});
  const [favorite, setFavorite] = useState<InitialData>({});
  const { user } = useContext(UserContext);

  console.log('FAVORITE: ', favorite)

  useEffect(() => {
    fireDB.child('contacts').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setContact({...snapshot.val()});
      } else {
        setContact({});
      }
    });

    return () => {
      setContact({});
    };
  }, [email]);

  function handleAddButton (e: React.SyntheticEvent) {
    e.preventDefault();

    if (user.email == '') {
      return alert('Please log in to be able to use the application.');
    } else if (!(firstName && lastName && dateOfBirth && mobilePhone && homePhone && email && pager)) {
      return alert('Please fill in all fields.');
    } else {
      fireDB.child("contacts").push({firstName, lastName, dateOfBirth, mobilePhone, homePhone, email, pager}, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Contact added!');
        }
      })
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      setMobilePhone('');
      setHomePhone('');
      setEmail('');
      setPager('');
    }
  }

  function handleDeleteButton (id: string) {
    fireDB.child(`/contacts/${id}`).remove((err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success('Contact deleted!');
      }
    })
  }

  function handleFavoritesButton (id: string) {
    fireDB.child(`contacts/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setFavorite({...snapshot.val()});
      } else {
        setFavorite({});
      }
    })
  }

  // function sortByAlphabet () {
  //   const sorted = contactArray.sort((a, b) => {

  //     if (firstName) {
  //       const nameA = a.firstName.toLowerCase();
  //       const nameB = b.firstName.toLowerCase();
  //       if (nameA < nameB) return -1;
  //       if (nameA > nameB) return 1;
  //       return 0;
  //     } else if (lastName) {
  //       const nameA = a.lastName.toLowerCase();
  //       const nameB = b.lastName.toLowerCase();
  //       if (nameA < nameB) return -1;
  //       if (nameA > nameB) return 1;
  //       return 0;
  //     } else if (email) {
  //       const nameA = a.email.toLowerCase();
  //       const nameB = b.email.toLowerCase();
  //       if (nameA < nameB) return -1;
  //       if (nameA > nameB) return 1;
  //       return 0;
  //     }
  //   });
  //   setContactArray(sorted);
  // }

  // function sortByDate () {
  //   const sorted = contactArray.sort((a, b) =>
  //       new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime()
  //   )
  //   setContactArray(sorted);
  // }

  // function sortByNumber () {
  //   const sorted = contactArray.sort((a, b) => {
  //     if (mobilePhone) {
  //       return Number(a.mobilePhone) - Number(b.mobilePhone);
  //     } else if (homePhone) {
  //       return Number(a.homePhone) - Number(b.homePhone);
  //     } else if (pager) {
  //       return Number(a.pager) - Number(b.pager);
  //     }
  //   })
  //   setContactArray(sorted);
  // }

  return (
    <div className="contact-list-container">
      <div className="contact-form">
        <form className="contact-input-form">
          <h2 className="contact-form-title">Create contact</h2> 
          <div className="input-order">
            <label className="add-label">First name:</label>
            <input 
              className="add-input-information" 
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
              className="add-input-information" 
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
              className="add-input-information" 
              type="datetime-local" 
              max={new Date().toISOString().slice(0, -8)} 
              placeholder="Enter date of birth..." 
              value={dateOfBirth || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}>
            </input>     
          </div>
          <div className="input-order">
            <label className="add-label">Type of contact:</label>
            <input 
              type="radio" 
              id="contactChoice1" 
              name="contact" 
              value="mobile" 
              checked={radio === 'mobile'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
            </input>
            <label htmlFor="contactChoice1">Mobile</label>
            <input 
              type="radio" 
              id="contactChoice2" 
              name="contact" 
              value="phone" 
              checked={radio === 'phone'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
            </input>
            <label htmlFor="contactChoice2">Home</label>
            <input 
              type="radio" 
              id="contactChoice3" 
              name="contact" 
              value="email" 
              checked={radio === 'email'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
            </input>
            <label htmlFor="contactChoice3">Email</label>
            <input 
              type="radio" 
              id="contactChoice4" 
              name="contact" 
              value="pager" 
              checked={radio === 'pager'} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadio(e.target.value)}>
            </input>
            <label htmlFor="contactChoice3">Pager</label>
          </div>

          {radio === 'mobile' &&
            <input 
              className="add-input-information" 
              type="number" 
              placeholder="Enter mobile phone..." 
              defaultValue={mobilePhone} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobilePhone(e.target.value)}>
            </input>}

          {radio === 'phone' && 
          <input 
            className="add-input-information" 
            type="number" 
            placeholder="Enter home phone..." 
            defaultValue={homePhone} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHomePhone(e.target.value)}>
          </input>}

          {radio === 'email' && 
          <input 
            className="add-input-information" 
            type="text" 
            placeholder="Enter email..." 
            defaultValue={email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}>
          </input>}

          {radio === 'pager' &&
          <input 
            className="add-input-information" 
            type="number" 
            placeholder="Enter pager..." 
            defaultValue={pager} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPager(e.target.value)}>
          </input>}   

          <div className="add-button-container">
            <button className="add-contact-button" type="submit" onClick={handleAddButton}>Create</button>
          </div>
        </form>
      </div>

      <div className="contact-table">
        <table className="table-container">
          <thead className="table-header">
            <tr className="table-row">
              {/* <th className="table-title"><button className="title-button" type="button" onClick={sortByAlphabet}>First name</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByAlphabet}>Last name</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByDate}>Date of birth</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByNumber}>Mobile phone</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByNumber}>Home phone</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByAlphabet}>Email</button></th>
              <th className="table-title"><button className="title-button" type="button" onClick={sortByNumber}>Pager</button></th> */}
              <th className="table-title">Functions</th>
            </tr>
          </thead>
          <tbody className="table-body">
          {user.email && contact != null && Object.entries(contact).map((item, index) => (
            <tr className="table-row" key={index}>
              <td className="table-data">{item[1].firstName}</td>
              <td className="table-data">{item[1].lastName}</td>
              <td className="table-data">{moment(item[1].dateOfBirth).format('MMMM Do, YYYY')}</td>
              <td className="table-data">{item[1].mobilePhone}</td>
              <td className="table-data">{item[1].homePhone}</td>
              <td className="table-data">{item[1].email}</td>
              <td className="table-data">{item[1].pager}</td>
              <td>
                <Link to={`/contacts/${item[0]}`}>
                  <button className="table-button">View</button>
                </Link> 
                <button className="table-button" onClick={() => handleDeleteButton(item[0])}>Delete</button>
                <button className="table-button" onClick={() => handleFavoritesButton(item[0])}>Favorite</button>
              </td>
            </tr>   
          ))}
          </tbody>
          </table>
      </div>
    </div>   
  );
}

export default ContactList;
