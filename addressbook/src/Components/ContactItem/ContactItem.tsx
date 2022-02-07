import './ContactItem.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import fireDB from 'Firebase/Firebase';
import { Contact } from '../../Types/Types';
import { toast } from 'react-toastify';
import moment from 'moment';

const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobilePhone: '',
    homePhone: '',
    email: '',
    pager: '' 
}

function ContactItem () {

  const [contact, setContact] = useState<Contact>(initialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fireDB.child(`contacts/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setContact({...snapshot.val()});
      } else {
        setContact(initialState);
      }
    })
  }, [id]);

  function handleDeleteButton (id: string) {
    fireDB.child(`/contacts/${id}`).remove((err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success('Contact deleted!');
      }
    });
    navigate('/contacts');
  }

  return (
    <div className="contact-item-container">
    {contact != null &&
      <div className="contact-item">
        <h2 className="contact-title">Contact view</h2>
        <div className="contact-info">{contact.firstName}</div>
        <div className="contact-info">{contact.lastName}</div>
        <div className="contact-info">{moment(contact.dateOfBirth).format('MMMM Do, YYYY')}</div>
        <div className="contact-info">{contact.mobilePhone}</div>
        <div className="contact-info">{contact.homePhone}</div>
        <div className="contact-info">{contact.email}</div>    
        <div className="contact-info">{contact.pager}</div>
        <div className="contact-view-button">
          <Link to={'/contacts'}>
            <button className="contact-button">Back</button>
          </Link>
          <Link to={`/update/${id}`}>
            <button className="table-button">Update</button>
          </Link>
          <button className="table-button" onClick={() => handleDeleteButton(id)}>Delete</button>
        </div>
      </div>
    }
    </div>
  );
}

export default ContactItem;
