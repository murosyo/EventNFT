import React from 'react';
import { useParams } from 'react-router-dom';
import { events } from './../testData';

const Event = () => {
  const {eventId} = useParams();
  const event = events[eventId];
  const comments = [
    {
      name: "タロウ",
      comment: "すごく刺激的な経験でした！短い期間でアイディアを形にするプレッシャーがありましたが、チームメンバーと協力して新しいスキルを学び、素晴らしいプロジェクトを完成させることができて充実感があります。"
    },
    {
      name: "ハナコ",
      comment: "ハッカソンはアイディアを実現するためのクリエイティブなプレイグラウンドでした。限られた時間内でアプローチを試し、失敗から学び、最終的には成果を出す過程が非常に貴重でした。"
    },
    {
      name: "ユウキ",
      comment: "初めてのハッカソン参加でしたが、他の参加者とのネットワーキングが広がり、異なるバックグラウンドを持つ人々と協力する楽しさを実感しました。アイディアが形になる瞬間は本当に感動的でした。"
    },
    {
      name: "リカ",
      comment: "ハッカソンでの数日間は、アイディアの出し合いからデモのプレゼンテーションまで、非常に集中的で充実した時間でした。限られたリソースの中で創造力を発揮することで、自分たちの限界を超えることができました。"
    },
    {
      name: "ケント",
      comment: "ハッカソンはプレッシャーの中でのチームワークを強化する絶好の機会でした。アイディアを遂行するためにはスムーズなコミュニケーションとタスクの分担が必要で、それが成功への鍵であることを学びました。また、新しいテクノロジーやツールに触れることで、自分のスキルアップにも繋がりました。"
    }
  ];

  return (
    <div className='mx-auto w-5/6 space-y-10'>
      <h1 className='text-xl font-bold'>{event.title}</h1>
      <img src={event.image} alt="NFT画像" className='mx-auto w-64' />
      <div className='text-left space-y-1'>
        <p><strong>日付</strong>：{event.date}</p>
        <p><strong>場所</strong>：{event.location}</p>
        <p><strong>概要</strong>：{event.details}</p>
      </div>
      <div>
        {(() => {
          if (event.status === "collecting_comments") {
            return (
              <p className='font-bold'>コメント集計中...</p>
            );
          } else if (event.status === "generated_image") {
            return (
              <div className='space-y-4'>
                <p className='font-bold'>参加者のコメント</p>
                {comments.map((comment, index) => {
                  return (
                    <p key={index} className='text-left'>
                      {comment.comment}
                      <strong className='text-gray-500'>by.{comment.name}</strong>
                    </p>
                  );
                })}
              </div>
            );
          } else {
            console.error("error");
            console.log(event);
          }
        })()}
      </div>
    </div>
  );
};

export default Event;
