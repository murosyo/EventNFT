import axios from 'axios';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "./../../config/firebase";
import { ig } from "./../../config/imageGeneration";


const CollectComment = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [comments, setComments] = useState([]);
  const eventRef = doc(db, "events", eventId);
  const QRcode = "https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fevent-nft-memories.vercel.app%2Fevent%2F" + eventId + "%2Fcomment&size=100x100";
  const navigate = useNavigate();

  const handleConfirm = () => {
    const confirm = window.confirm("コメントを締め切り、画像を生成します。\n本当によろしいですか？");
    if (confirm) {
      createImage();
    };
  };

  const createImage = async () => {
    var commentList = [];
    comments.map((obj) => {
      commentList.push(obj.comment);
      return (obj.comment)
    });
    console.log(commentList);
    const data = {
      "event": event,
      "comments": commentList,
      "keywords": [
        "ccc",
        "ddd",
      ] //最大5つ
    };
    await axios.post(ig.baseURL + "/", data, { headers: ig.headers })
      .then((urls) => {
        setEvent({...event, status:"generated_image", image: urls[0]});
        navigate("/event/" + eventId);
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getEvent = async () => {
      console.log("GetEvent");
      try {
        const eventDoc = await getDoc(eventRef);
        const event = eventDoc.data();
        setEvent(event);
      } catch(err) {
        console.log(err);
      }
    }
    const getComments = async () => {
      console.log("GetCommentList");
      const commentsRef = query(collection(db, "comments"), where("eventId", "==", eventId));
      try {
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
  }, []);

  return (
    <div className='flex flex-col'>
      <h1 className='text-xl font-bold'>{event.title}</h1>
      <p className='mb-6 font-bold'>コメント募集用QRコード</p>
      <div className='mx-auto w-40 h-40'>
        <img src={QRcode} alt='QRコード' className='w-full h-full' />
      </div>
      <p className='mt-2 mb-8 font-xs text-gray-600'>▲長押しで保存できます</p>
      <button onClick={handleConfirm} className='mx-auto btn'>コメントを締め切る</button>
    </div>
  );
};

export default CollectComment;
