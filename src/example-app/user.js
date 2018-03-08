import React from 'react';

const Stat = ({ type, count }) => (
  <div className="f6 tc">
    <span className="db b dark-green f3">{count}</span> {type}
  </div>
);

const User = ({ altText, goodAltText, user }) => {
  let alt;

  if (altText) {
    alt = goodAltText ? '' : 'a picture';
  }

  return (
    <div>
      <div className="flex items-center">
        <img
          height="80"
          width="80"
          src={user.avatar}
          className="br-100"
          alt={alt}
        />
        <div className="pr3 pl3 flex-auto">
          <h1 className="mb1 b f5">{user.username}</h1>

          <p className="f6">{user.bio}</p>
        </div>
      </div>

      <div className="mt3 pt3 bt b--black-10 flex justify-around">
        <Stat type="croaks" count="52" />
        <Stat type="friends" count="15" />
        <Stat type="photos" count="337" />
      </div>
    </div>
  );
};

export default User;
