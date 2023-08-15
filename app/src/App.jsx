import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';

import {
  CollectComment,
  Comment,
  Event,
  Login,
  NewEvent,
  NewUser,
  Test,
  Top
} from './pages';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='my-10 min-h-screen'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/new" element={<NewUser />} />
          <Route path="/event/new" element={<NewEvent />} />
          <Route path="/event/:eventId" element={<Event />} />
          <Route path="/event/:eventId/collectcomments" element={<CollectComment />} />
          <Route path="/event/:eventId/comment" element={<Comment />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
