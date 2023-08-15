import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "./../../config/firebase";


const Comment = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [comment, setComment] = useState({
    name: '',
    comment: '',
  });
  const eventRef = doc(db, "events", eventId);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = () => {
    console.log(comment);
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventDoc = await getDoc(eventRef);
        const event = eventDoc.data();
        setEvent(event);
      } catch(err) {
        console.log(err);
      };
    };
    getEvent();
  }, []);

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
