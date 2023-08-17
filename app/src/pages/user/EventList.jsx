import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { EventCard } from "./../../components";
import { db } from "./../../config/firebase";

const EventList = () => {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const getEvents = async () => {
      console.log("GetEvents");
      try {
        const eventsRef = query(collection(db, "events"), orderBy("created_at", "desc"));
        const data = await getDocs(eventsRef);
        const events = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(events);
      } catch (err) {
        console.error(err)
      }
    }
    getEvents();
  }, []);

  return (
    <div>
      <h1 className='text-xl font-bold mb-6'>イベント一覧</h1>
      <div className='mx-auto w-5/6 flex flex-wrap'>{
        events.map((event, i) => {
          return (<EventCard key={i} event={event} />);
        })
      }</div>
    </div>
  );
};

export default EventList;
