import React from 'react';

const Header = () => {
  return (
    <header className='sticky top-0'>
      <div className="bg-slate-50 space-x-2">
        <a href='/'>Top</a>
        <a href='/user/new'>新規登録</a>
        <a href='/login'>ログイン</a>
        <a href='/event/new'>イベント作成</a>
        <a href='/event/1/collectcomments'>QRコード</a>
        <a href='/event/1/comment'>コメント</a>
        <a href='/event/1'>集計中</a>
        <a href='/event/0'>集計後</a>
      </div>
      <div className="py-4 bg-slate-900">
        <a href='/' className='text-slate-50 font-bold'>EventNFT Memories</a>
      </div>
    </header>
  );
};

export default Header;
