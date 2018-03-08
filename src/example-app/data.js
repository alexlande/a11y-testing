import frogsworth from './images/1.jpg';
import thor from './images/thor.jpg';

export const users = {
  frogsworth: {
    username: 'Frogsworth',
    bio: 'Just a frog on the internet, nothing to see here.',
    avatar: frogsworth
  },
  thor: {
    username: 'Thor',
    bio:
      'If anyone can see this, help! My loathsome brother has transformed me into a frog again!',
    avatar: thor
  }
};

export const croaks = [
  {
    user: users.frogsworth,
    datetime: '2018-02-11T22:38:02.945Z',
    text: 'Hello world!'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T22:39:02.945Z',
    text: 'How goes it?'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T22:40:02.945Z',
    text: 'Ribbit'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T00:13:02.945Z',
    text:
      'Did you ever notice that sometimes Croaks are really long? I don’t know exactly how many characters but it seems like maybe about one hundr'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T05:24:02.945Z',
    text: 'I’m here to eat bugs and... well, that’s it really'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T06:59:02.945Z',
    text: 'Saw an amazing lily pad this morning, I sat on it for like 6 hours!'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T11:01:02.945Z',
    text: 'Croak... croak... croak...'
  },
  {
    user: users.frogsworth,
    datetime: '2018-02-11T11:02:02.945Z',
    text: 'Who is this weird frog that keeps commenting on all of my photos?'
  }
];

export const comments = [
  {
    user: users.thor,
    datetime: '2018-02-11T11:04:17.945Z',
    text: 'Hark!'
  }
];
