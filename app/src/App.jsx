import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import {
  CollectComment,
  Comment,
  Event,
  EventList,
  Login,
  NewEvent,
  NewUser,
  Test,
  Top
} from './pages';


function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <div className='my-10 flex-grow'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/user/new" element={<NewUser />} />
          <Route path="/user/:userId/events" element={<EventList />} />
          <Route path="/event/new" element={<NewEvent />} />
          <Route path="/event/:eventId" element={<Event />} />
          <Route path="/event/:eventId/collectcomments" element={<CollectComment />} />
          <Route path="/event/:eventId/comment" element={<Comment />} />
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
