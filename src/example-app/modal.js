import React from 'react';
import FocusTrap from 'focus-trap-react';

import Croak from './croak';
import CloseIcon from './icons/close';
import { users, comments } from './data';

const Modal = ({
  closeModal,
  content,
  altText,
  buttonText,
  goodAltText,
  keyboardElements
}) => {
  if (!content) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 overflow-auto pa4">
      <FocusTrap>
        <div
          onClick={closeModal}
          className="modalBackdrop bg-black-60 fixed top-0 right-0 bottom-0 left-0"
        />

        <div className="bg-white br3 relative mw6 center shadow-4">
          <div className="pa3 tr">
            <button
              className="dark-green hover-black v-mid"
              onClick={closeModal}
              aria-label="Close"
            >
              <CloseIcon className="v-mid" />
            </button>
          </div>

          <img className="db" src={content.src} alt={content.goodAlt} />

          <Croak
            user={users.thor}
            content={comments[0].text}
            datetime={comments[0].datetime}
            altText={altText}
            buttonText={buttonText}
            goodAltText={goodAltText}
            keyboardElements={keyboardElements}
          />
        </div>
      </FocusTrap>
    </div>
  );
};

export default Modal;
