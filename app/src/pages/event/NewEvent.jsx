import { addDoc, collection } from "firebase/firestore";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../../config/firebase.js";


const NewEvent = () => {
  let now = new Date();
  const [event, setEvent] = useState({
    title: '',
    'date-start': '',
    'date-end': '',
    location: '',
    details: '',
    userId: '',
    status: 'collecting_comments',
    image: '/commingsoon.jpg',
    contract_address: '',
    userId: '',
    created_at: now.getTime()
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    var {name, value} = e.target;
    if (name === 'date-start' || name === 'date-end') {
      value = value.replace('T', ' ');
    }
    console.log(name, value);
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, "events"), event);
      console.log("Document written with ID: ", docRef.id);
      navigate("/event/" + docRef.id + "/collectcomments");
    } catch (err) {
      console.error("Error adding document: ", err);
    };
  };

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>イベント作成</h1>
      <form className='form'>
        <div>
          <p>イベント名</p>
          <input type='text' name='title' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>開始日時</p>
          <input type='datetime-local' name='date-start' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>終了日時</p>
          <input type='datetime-local' name='date-end' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>場所</p>
          <input type='text' name='location' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>概要</p>
          <textarea type='textarea' name='details' onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onClick={handleSubmit}>作成</button>
      </form>
    </div>
  );
};

export default NewEvent;
