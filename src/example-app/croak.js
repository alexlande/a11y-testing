import React from 'react';

import ReplyIcon from './icons/reply';
import RecroakIcon from './icons/recroak';
import Link from './link';

const iconSize = 18;
const buttonClasses = 'dark-green db hover-black';

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric'
});

const Croak = ({
  altText,
  buttonText,
  goodAltText,
  keyboardElements,
  content,
  datetime,
  index,
  user
}) => {
  const date = new Date(datetime);
  const time = formatter.format(date);

  let alt = undefined;

  if (altText) {
    alt = goodAltText ? '' : 'Picture';
  }

  const ButtonTag = keyboardElements ? 'button' : 'div';

  return (
    <div className="flex pa3 bt b--black-10">
      <img
        height="50"
        width="50"
        src={user.avatar}
        className="br-100"
        alt={alt}
      />
      <div className="pr3 pl3 flex-auto">
        <div className="mb1 f6 b">
          <Link className="no-underline dark-green">{user.username}</Link>
        </div>

        <div>{content}</div>

        <div className="mt2 black-60 f6">{time}</div>
      </div>
      <div>
        <ButtonTag
          aria-label={buttonText ? 'Reply' : undefined}
          className={buttonClasses}
        >
          <ReplyIcon size={iconSize} />
        </ButtonTag>

        <ButtonTag
          aria-label={buttonText ? 'Recroak' : undefined}
          className={`${buttonClasses} mt2`}
        >
          <RecroakIcon size={iconSize} />
        </ButtonTag>
      </div>
    </div>
  );
};

export default Croak;
