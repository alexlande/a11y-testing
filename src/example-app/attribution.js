import React from 'react';

const photos = [
  {
    title: 'Green tree frog or dumpy frog',
    url: 'https://unsplash.com/photos/2slBHG3HtdA',
    author: 'David Clode',
    authorUrl: 'https://unsplash.com/@davidclode'
  },
  {
    title: 'Rise and shine',
    url: 'https://unsplash.com/photos/IY9bfJAM2zM',
    author: 'David Clode',
    authorUrl: 'https://unsplash.com/@davidclode'
  },
  {
    title: 'Untitled',
    url: 'https://unsplash.com/photos/7YfY61ILEwg',
    author: 'Ruben Engel',
    authorUrl: 'https://unsplash.com/@rbnngl'
  },
  {
    title: 'Untitled',
    url: 'https://unsplash.com/photos/Gxa1GeJ2TlY',
    author: 'Ladd Greene',
    authorUrl: 'https://unsplash.com/@laddtheimpaler'
  },
  {
    title: 'Untitled',
    url: 'https://unsplash.com/photos/xorjaMB8W70',
    author: 'Delfi de la Rua',
    authorUrl: 'https://unsplash.com/@delfidelarua7'
  },
  {
    title: 'Frog in the Water',
    url: 'https://unsplash.com/photos/iVTGkBM0mP0',
    author: 'Henry Fournier',
    authorUrl: 'https://unsplash.com/@henryatpull'
  }
];

const link = 'link b dark-green hover-black';

const Attribution = () => (
  <div>
    <h2 className="f5 fb mb3">Attribution</h2>

    <h3 className="f6 fb mb2">Photos</h3>

    <ul className="f6 mb3">
      {photos.map((photo, i) => (
        <li className={i > 0 ? 'mt2' : null} key={photo.url}>
          <a className={link} href={photo.url}>
            {photo.title}
          </a>{' '}
          by{' '}
          <a className={link} href={photo.authorUrl}>
            {photo.author}
          </a>
        </li>
      ))}
    </ul>

    <h3 className="f6 fb mb2">Icons</h3>

    <ul className="f6">
      <li>
        <a className={link} href="https://thenounproject.com/icon/1469289/">
          Frog Icon
        </a>{' '}
        created by{' '}
        <a
          className={link}
          href="https://thenounproject.com/marco.livolsi2014/"
        >
          Marco Livolsi
        </a>{' '}
        from the Noun Project
      </li>
    </ul>
  </div>
);

export default Attribution;
