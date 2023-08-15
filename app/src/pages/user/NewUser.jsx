import React, { useState } from 'react';

const NewUser = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    console.log(user);
  };

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>新規登録</h1>
      <form className='form'>
        <div>
        <p>ユーザー名</p>
          <input type='text' name='username' onChange={handleChange} className='input' />
          </div>
        <div>
          <p>メールアドレス</p>
          <input type='text' name='email' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>パスワード</p>
          <input type='password' name='password' onChange={handleChange} className='input' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>新規登録</button>
      </form>
    </div>
  );
};

export default NewUser;
