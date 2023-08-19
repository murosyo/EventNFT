import axios from 'axios';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "./../../config/firebase";
import { nft } from "./../../config/toNFT";


const GiveNFT = () => {
  const {eventId} = useParams();
  const [event, setEvent] = useState([]);
  const [body, setBody] = useState({
    contract_address: '',
    receiver_wallet_address: '',
    event: {},
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setBody({ ...body, [name]: value });
  };

  const handleSubmit = async (e) => {
    // await axios.post("/api/givenft", body, { headers: nft.headers })
    await axios.post("/api/test/givenft", body, { headers: nft.headers })
    .then((res) => {
      console.log(res.data);
      navigate('/user/0/events');
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const getEvent = async () => {
      console.log("GetEvent");
      try {
        const eventRef = doc(db, "events", eventId);
        const eventDoc = await getDoc(eventRef);
        const event = eventDoc.data();
        setEvent(event);
        setBody({
          ...body,
          contract_address: event.contract_address,
          event: event
        })
        if (event.status != 'generated_image') {
          navigate('/event/' + eventId);
        }
      } catch(err) {
        console.log(err);
      };
    };
    getEvent();
  }, [eventId]);

  return (
    <div className='mx-auto w-5/6 space-y-10'>
      <h1 className='text-xl font-bold mb-6'>{event.title}</h1>
      <div className='mx-auto mb-8 w-64 h-64'>
        <img src={event.image} alt="NFT画像" className='mx-auto mb-6 w-64 h-64' />
      </div>
      <form className="form">
        <div>
          <p>Wallet Address</p>
          <input type="text" name="receiver_wallet_address" onChange={handleChange} className="input" />
        </div>
        <button disabled onClick={handleSubmit} className='mx-auto mt-2 w-full btn-disabled'>受け取る</button>
      </form>
    </div>
  );
};

export default GiveNFT;
