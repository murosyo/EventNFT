import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { events } from './../testData';

const Comment = () => {
  const {eventId} = useParams();
  const event = events[eventId];

  const [comment, setComment] = useState({
    name: '',
    comment: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = () => {
    console.log(comment);
  };

  return (
    <div>
      <h1 className='text-xl font-bold'>{event.title}</h1>
      <p className='font-bold mb-6'>このイベントにコメントを投稿しよう</p>
      <form className='form'>
        <div>
          <p>ニックネーム</p>
          <input type='text' name='name' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>コメント</p>
            <textarea type='textarea' name='comment' onChange={handleChange} className='textarea' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>投稿する</button>
      </form>
    </div>
  );
};

export default Comment;