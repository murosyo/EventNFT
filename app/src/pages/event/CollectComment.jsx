import React from 'react';
import { useParams } from 'react-router-dom';
import { events } from './../testData';

const CollectComment = () => {
  const {eventId} = useParams();
  const event = events[eventId];

  const QRcode = "https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fevent-nft-memories.vercel.app%2Fevent%2F" + eventId + "%2Fcomment&size=100x100";

  return (
    <div className='flex flex-col'>
      <h1 className='text-xl font-bold'>{event.title}</h1>
      <p className='font-bold mb-6'>コメント募集用QRコード</p>
      <div className='mx-auto mb-8 w-40 h-40'>
        <img src={QRcode} alt='QRコード' className='w-full h-full' />
      </div>
      <a className='mx-auto mb-3 btn'>画像を保存する</a>
      <a className='mx-auto btn'>募集を完了する</a>
    </div>
  );
};

export default CollectComment;
