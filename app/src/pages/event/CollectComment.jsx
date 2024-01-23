import axios from 'axios';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from "./../../config/firebase";
import { ig } from "./../../config/imageGeneration";
import { nft } from "./../../config/toNFT";

const CollectComment = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [comments, setComments] = useState([]);
  const QRcode = "https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fevent-nft-memories.vercel.app%2Fevent%2F" + eventId + "%2Fcomment&size=100x100";
  const navigate = useNavigate();
  
  const toNFTimage = async (url) => {
    const body = {
      wallet_address: "0x155418c24f57277b4d69d226c6b37e43a78c5d15",
      event: {
        title: event.title,
        details: event.details,
        image: url,
      }};

    // const nft_gdn = await axios.post("/api/createnft", body, { headers: nft.headers })
    const nft_gdn = await axios.post("/api/test/createnft", body, { headers: nft.headers })
    .then((res) => {
      console.log(res.data);
      return (res.data);
    }).catch((err) => {
      console.log(err);
    });
    return (nft_gdn);
  };

  const uploadImage = async (url) => {
    const storage_url = fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], 'nft/' + eventId + '.png'))
      .then( async(file) => {
        console.log(file);
        const storageRef = ref(storage, 'nft/' + eventId + '.png');
        const gsRef = ref(
          storage,
          'gs://' + storageRef.bucket + '/' + storageRef.fullPath
        );
        const snapshot = await uploadBytes(storageRef, file)
        const storage_url = await getDownloadURL(gsRef);
        return (storage_url);
      });
    return (storage_url);
  };

  const handleConfirm = async () => {
    const confirm = window.confirm("コメントを締め切り、画像を生成します。\n本当によろしいですか？");
    if (confirm) {
      try {
        // const url = await createImage();
        const url = "https://2.bp.blogspot.com/-NSxv59ZcJfA/VpjCbp0555I/AAAAAAAA3AM/jVD3WGXyRlU/s800/group_kids.png";
        const storage_url = await uploadImage(url);
        const nft = await toNFTimage(storage_url);
        const eventRef = doc(db, "events", eventId);
        console.log(storage_url);
        await setDoc(eventRef, event);
        await updateDoc(eventRef, {
          status: "generated_image",
          image: storage_url,
          contract_address: nft.contract_address
        });
        navigate("/event/" + eventId);
      } catch(err) {
        console.log(err);
      };
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
        console.log(event);
        if (event.status === "generated_image") {
          navigate("/event/" + eventId);
        }
      } catch(err) {
        console.log(err);
      }
    };

    const getComments = async () => {
      const commentsRef = query(collection(db, "comments"), where("eventId", "==", eventId));
      const data = await getDocs(commentsRef);
      const commentList = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setComments(commentList);
      var commentData = [];
      comments.map((obj) => {
        commentData.push(obj.comment);
        return (obj.comment);
      });
      const body = {
        "event": event,
        "comments": commentData,
        "keywords": [
        ] //最大5つ
      };
      console.log(body);
  
      // const urls = await axios.post(ig.baseURL + "/test", body, { headers: ig.headers })
      const urls = await axios.post(ig.baseURL + "/", body, { headers: ig.headers })
        .then(async (urls) => {
          console.log(urls.data);
          return urls.data;
        }).catch((err) => {
          console.log(err);
        });
      // return (urls[0]);
    };

    getEvent();
    getComments();
  }, [eventId]);

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
