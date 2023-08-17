import React from 'react';

const EventCard = ({event, key}) => {
  return (
    <div key={key} className='p-1 w-1/2'>
      <a href={"/event/" + event.id} >
        <img src={event.image} className='w-full h-full' />
      </a>
    </div>
  );
};

export default EventCard;
