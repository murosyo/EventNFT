import axios from 'axios';
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from "./../config/firebase";
import { ig } from "./../config/imageGeneration";
import { nft } from "./../config/toNFT";

const Test = () => {
  const [data, setData] = useState({
    text1: 'test1',
    text2: ''
  });
  const [imagePath, setImagePath] = useState('');
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

  const handleClick7 = () => {
    const url = "https://2.bp.blogspot.com/-NSxv59ZcJfA/VpjCbp0555I/AAAAAAAA3AM/jVD3WGXyRlU/s800/group_kids.png";
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], 'image.jpg'))
      .then( async (file) => {
        console.log(file);
        const storageRef = ref(storage, 'test.png');
        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      });
  };

  useEffect(() => {
    console.log("useEffect");
    const storageRef = ref(storage, "nft/2.png");
    const gsRef = ref(
      storage,
      'gs://' + storageRef.bucket + '/' + storageRef.fullPath
    );
    getDownloadURL(gsRef)
      .then((url) => {
        console.log(url);
        setImagePath(url);
      })
      .catch((err) => console.log(err));
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
        <button onClick={handleClick7} className='mx-auto w-28 btn'>storage</button>
        <img src={imagePath} />
      </div>
    </div>
  );
};

export default Test;
