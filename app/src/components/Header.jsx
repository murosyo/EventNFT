import React, { useState } from 'react';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className='sticky top-0'>
      <div className="px-2 py-4 bg-slate-900 flex justify-between items-center">
        <a href='/' className='text-slate-50 font-bold'>EventNFT Memories</a>
        <button onClick={handleMenuOpen} type="button" className="z-10 space-y-2">
          <div
            className={
              openMenu
                ? 'w-6 h-0.5 bg-slate-900 translate-y-2.5 rotate-45 transition duration-500 ease-in-out'
                : 'w-6 h-0.5 bg-slate-50 transition duration-500 ease-in-out'
            }
          />
          <div
            className={
              openMenu
                ? 'opacity-0 transition duration-500 ease-in-out'
                : 'w-6 h-0.5 bg-slate-50 transition duration-500 ease-in-out'
            }
          />
          <div
            className={
              openMenu
                ? 'w-6 h-0.5 bg-slate-900 -rotate-45 transition duration-500 ease-in-out'
                : 'w-6 h-0.5 bg-slate-50 transition duration-500 ease-in-out'
            }
          />
        </button>
      </div>

          {/* nav */}
          <nav
            className={
              openMenu
                ? 'text-right fixed bg-slate-50 right-0 top-0 w-2/5 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300'
                : 'fixed right-[-100%] ease-linear duration-300'
            }
          >
            <ul className="mt-6">
              <li>
                <a href="/" className="py-2 inline-block">
                  Top
                </a>
              </li>
              <li>
                <a href="/user/new" className="py-2 inline-block">
                  新規登録
                </a>
              </li>
              <li>
                <a href="/login" className="py-2 inline-block">
                  ログイン
                </a>
              </li>
              <li>
                <a href="/user/0/events" className="py-2 inline-block">
                  イベント一覧
                </a>
              </li>
              <li>
                <a href="/event/new" className="py-2 inline-block">
                  イベント作成
                </a>
              </li>
              <li>
                <a href="/event/1/collectcomments" className="py-2 inline-block">
                  QRコード
                </a>
              </li>
              <li>
                <a href="/event/1/comment" className="py-2 inline-block">
                  コメント
                </a>
              </li>
              <li>
                <a href="/event/1" className="py-2 inline-block">
                  集計中
                </a>
              </li>
              <li>
                <a href="/event/0" className="py-2 inline-block">
                  集計後
                </a>
              </li>
              <li>
                <a href="/event/2/givenft" className="py-2 inline-block">
                  NFT受け取り
                </a>
              </li>
              <li>
                <a href="/test" className="py-2 inline-block">
                  テスト
                </a>
              </li>
            </ul>
          </nav>
    </header>
  );
};

export default Header;
