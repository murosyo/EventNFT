import React, { useState } from 'react';


const Login = () => {
  const [user, setUser] = useState({
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
      <h1 className='text-xl font-bold mb-6'>ログイン</h1>
      <form className='form'>
        <div>
          <p>メールアドレス</p>
          <input type='text' name='email' onChange={handleChange} className='input' />
        </div>
        <div>
          <p>パスワード</p>
            <input type='password' name='password' onChange={handleChange} className='input' />
        </div>
        <button className='mx-auto mt-2 w-full btn' onChange={handleSubmit}>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
