import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NewEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    details: '',
    userId: '',
    status: 'collecting_comments',
    image: 'commingsoon.jpg',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = () => {
    console.log(event);
    navigate("/");
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
          <p>日付</p>
          <input type='text' name='date' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>場所</p>
          <input type='text' name='location' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>概要</p>
          <textarea type='textarea' name='details' onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>作成</button>
      </form>
    </div>
  );
};

export default NewEvent;
