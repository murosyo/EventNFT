import React from 'react';


const Top = () => {
  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>Top</h1>
      <div className='space-x-3'>
        <a href="/user/new" className='btn'>新規登録</a>
        <a href="/login" className='btn'>ログイン</a>
      </div>
    </div>
  );
};

export default Top;
