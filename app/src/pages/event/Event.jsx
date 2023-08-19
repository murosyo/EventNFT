import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "./../../config/firebase";


const Event = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [comments, setComments] = useState([]);

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
    const getComments = async () => {
      console.log("GetCommentList");
      try {
        const commentsRef = query(collection(db, "comments"), where("eventId", "==", eventId));
        const data = await getDocs(commentsRef);
        const commentList = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setComments(commentList);
      } catch (err) {
        console.error(err);
      };
    };
    getEvent();
    getComments();
  }, [eventId]);

  return (
    <div className='mx-auto w-5/6 space-y-10'>
      <h1 className='text-xl font-bold'>{event.title}</h1>
      <div className='mx-auto mb-8 w-64 h-64'>
        <img src={event.image} alt="NFT画像" className='mx-auto w-64 h-64' />
      </div>
      <a href={'/event/' + eventId + '/givenft'} className='mx-auto mt-2 w-full btn'>NFTを受け取る</a>
      <div className='text-left space-y-1'>
        <p><strong>開始日時</strong>：{event['date-start']}</p>
        <p><strong>終了日時</strong>：{event['date-end']}</p>
        <p><strong>場所</strong>：{event.location}</p>
        <p><strong>概要</strong>：{event.details}</p>
      </div>
      <div>
        {(() => {
          if (event.status === "collecting_comments") {
            return (
              <p className='font-bold'>コメント集計中...</p>
            );
          } else if (event.status === "generated_image") {
            return (
              <div className='space-y-4'>
                <p className='font-bold'>参加者のコメント</p>
                {comments.map((comment, index) => {
                  return (
                    <p key={index} className='text-left'>
                      {comment.comment}
                      <strong className='text-gray-500'>by.{comment.name}</strong>
                    </p>
                  );
                })}
              </div>
            );
          } else {
            console.error("error");
          }
        })()}
      </div>
    </div>
  );
};

export default Event;
