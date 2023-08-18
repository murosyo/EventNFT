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
    console.log("handleClick1");
    navigate("/");
  };

  const handleClick2 = (e) => {
    console.log("handleClick2");
    // const {name, value} = e.target;
    // console.log(name, value);
    // setEvent({ ...event, [name]: value });
    setData({...data, text2: 'test2'});
  };

  const handleClick3 = async () => {
    console.log("handleClick3");
    try {
      const docRef = await addDoc(collection(db, "test"), data);
      console.log("Document written with ID: <" + docRef.id + ">");
      navigate("/" + docRef.id + "/collectcomments");
    } catch (err) {
      console.error("Error adding document: ", err);
    };
  };

  const handleClick4 = async () => {
    console.log("handleClick4");
    await axios.get(ig.baseURL + "/", { headers: ig.headers })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleClick5 = async () => {
    console.log("handleClick5");
    await axios.post("/api/createnft", { headers: nft.headers })
    .then((res) => {
      console.log("handleClick5: success");
      console.log(res.data);
    }).catch((err) => {
      console.log("handleClick5: error");
      console.log(err);
    });
  };

  const handleClick6 = async () => {
    console.log("handleClick6");
    await axios.post("/api/givenft", { headers: nft.headers })
    .then((res) => {
      console.log("handleClick6: success");
      console.log(res);
    }).catch((err) => {
      console.log("handleClick6: error");
      console.log(err);
    });
  };

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
        <button onClick={handleClick5} className='mx-auto w-28 btn'>api接続(nft生成)</button>
        <button onClick={handleClick6} className='mx-auto w-28 btn'>api接続(nft配布)</button>
      </div>
    </div>
  );
};

export default Test;
