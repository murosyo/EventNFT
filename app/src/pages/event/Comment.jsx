import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "./../../config/firebase";


const Comment = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [comment, setComment] = useState({
    userId: '',
    eventId: eventId,
    name: '',
    comment: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, "comments"), comment);
      console.log("Document written with ID: ", docRef.id);
      navigate("/event/" + eventId);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      console.log("GetEvent");
      try {
        const eventRef = doc(db, "events", eventId);
        const eventDoc = await getDoc(eventRef);
        const event = eventDoc.data();
        setEvent(event);
      } catch(err) {
        console.log(err);
      };
    };
    getEvent();
  }, [eventId]);

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
        <button className='mx-auto mt-2 w-full btn' onClick={handleSubmit}>投稿する</button>
      </form>
    </div>
  );
};

export default Comment;
