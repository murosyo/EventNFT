import axios from 'axios';
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "./../config/firebase";
import { ig } from "./../config/imageGeneration";
import { nft } from "./../config/toNFT";


const Test = () => {
  const [data, setData] = useState({
    text1: 'test1',
    text2: ''
  });
  const navigate = useNavigate();

  const handleClick1 = () => {
    const id = "gvSN9WifHqAy8G2PvKwR";
    navigate("/");
  }

  const handleClick2 = (e) => {
    // const {name, value} = e.target;
    // console.log(name, value);
    // setEvent({ ...event, [name]: value });
    setData({...data, text2: 'test2'});
  };

  const handleClick3 = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), data);
      console.log("Document written with ID: <" + docRef.id + ">");
      navigate("/" + docRef.id + "/collectcomments");
    } catch (err) {
      console.error("Error adding document: ", err);
    };
  };

  const handleClick4 = async () => {
    await axios.get(ig.baseURL + "/", { headers: ig.headers })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleClick5 = async () => {
    await axios.get("/api", { headers: nft.headers })
    .then((res) => {
      console.log("handleClick5: success");
    }).catch((err) => {
      console.log("handleClick5: error");
    });
  }

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Test Page</h1>
      <div className='flex flex-col space-y-4' >
        <button onClick={handleClick1} className='mx-auto w-28 btn'>Topへ</button>
        <button onClick={handleClick2} className='mx-auto w-28 btn'>データ追加</button>
        <button onClick={handleClick3} className='mx-auto w-28 btn'>データ送信</button>
        <button onClick={handleClick4} className='mx-auto w-28 btn'>api接続(ig)</button>
        <button onClick={handleClick5} className='mx-auto w-28 btn'>api接続(img)</button>
      </div>
    </div>
  );
};

export default Test;
