import React from 'react';
import { useNavigate } from 'react-router-dom';


const Test = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }
  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Test Page</h1>
      <button onClick={handleClick} className='btn'>Topへ</button>
    </div>
  );
};

export default Test;
