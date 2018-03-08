import React from 'react';

import Heading from './heading';

import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image5 from './images/5.jpg';
import image6 from './images/6.jpg';

const Photo = ({ altText, goodAltText, badAlt, goodAlt, openModal, src }) => {
  let alt;

  if (altText) {
    alt = goodAltText ? goodAlt : badAlt;
  }

  return (
    <button className="dim db" onClick={() => openModal({ src, goodAlt })}>
      <img className="db br1" alt={alt} src={src} />
    </button>
  );
};

const Photos = ({ altText, openModal }) => (
  <div>
    <Heading>Photos</Heading>

    <div className="photosGrid">
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Green tree frog or dumpy frog by David Clode"
        src={image1}
        openModal={openModal}
      />
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Rise and shine by David Clode"
        src={image2}
        openModal={openModal}
      />
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Untitled by Ruben Engel"
        src={image3}
        openModal={openModal}
      />
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Untitled by Ladd Greene"
        src={image4}
        openModal={openModal}
      />
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Untitled by Delfi de la Rua"
        src={image5}
        openModal={openModal}
      />
      <Photo
        altText={altText}
        badAlt="Picture"
        goodAlt="Frog in the Water by Henry Fournier"
        src={image6}
        openModal={openModal}
      />
    </div>
  </div>
);

export default Photos;
