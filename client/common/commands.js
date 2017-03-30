import React from 'react';
import Links from '../components/Types/Links';
import Error from '../components/Types/Error';
import List from '../components/Types/List';
import Link from '../components/Types/Link';
import Awards from '../components/Types/Awards';
import Table from '../components/Types/Table';
import Pepe from '../components/Ascii/Pepe';
import Benfica from '../components/Ascii/Benfica';
import CONST from './constants';

const cmds = ['clear', 'social', 'about', 'work', 'awards', 'copyright', 'source', 'contact'];
const alt_cmds = ['pepe', 'slb'];

const tableHeader = ['Project', 'Description', 'Date', 'Resources'];

const awards = [{
    site: 'https://vasco.work',
    description: 'Featured on Form magazine issue #269',
    link: 'http://form.de/en/magazine/form269/filter'
  },
  {
    site: 'http://connectlisboa.com',
    description: 'Inspirational Website of the Week #231',
    link: 'https://tympanus.net/codrops/collective/collective-231/'
  }]

const tableBody = [{
    title: `Bike n' Connect`,
    description: 'React Native, Redux, Codepush',
    date: '2017',
    links: [{
      value: 'iOS',
      link: 'https://itunes.apple.com/app/bike-n-connect/id1215027805?ls=1&mt=8'
    },
    {
      value: 'Android',
      link: 'https://play.google.com/store/apps/details?id=com.sportsnconnect.bikenconnect&hl=en'
    }]
  },
  {
    title: `TTTism`,
    description: 'React, Redux, Ansible',
    date: '2016',
    links: [{
      value: 'Visit Site',
      link: 'http://tttism.com/'
    }]
  },
  {
    title: 'Connect Lisboa',
    description: 'Angular 2',
    date: '2016',
    links: [{
      value: 'Visit Site',
      link: 'http://connectlisboa.com'
    }]
  },
  {
    title: 'HOKO',
    description: 'Ruby on Rails',
    date: '2015',
    links: [{
      value: 'Visit Site',
      link: 'http://hokolinks.com'
    }]
  },
];

var Commands = function(value, callback, clear, showPepe) {
  switch (value) {
    case 'help':
    case '"help"':
    case 'Help':
    case 'commands':
    case 'Commands':
    case '"commands"':
    case 'yes':
    case 'Yes':
      callback(value, <List list={cmds} title="Here is the list of available commands you can try" />);
      break;

    case 'no':
    case 'No':
      callback(value, 'k');
      break;

    case 'hi':
    case 'Hi':
    case 'hello':
    case 'Hello':
    case 'hello world':
    case 'Hello world':
      callback(value, 'Hello fellow human. Do you need any help?');
      break;

    case 'fuck':
    case 'sex':
    case 'unicorn':
    case 'wtf':
    case 'xxx':
      callback(value, <List list={alt_cmds} title="🔑 You've unlocked the secret commands 🔑" />);
      break;

    case 'clear':
    case 'Clear':
      clear();
      break;

    case 'awards':
    case 'Awards':
      callback(value, <Awards awards={awards}/>);
      break;

    case 'slb':
    case 'Slb':
      callback(value, <Benfica/>)
      break;

    case 'source':
    case 'Source':
      callback(value, <Link link="http://github.com/vascogaspar/hello-portfolio" before="Made with React, Three.js and Greensock in Lisbon. You can find the source code of this website at"/>)
      break;

    case 'pepe':
    case 'Pepe':
      callback(value, <Pepe/>);
      break;

    case 'social':
    case 'Social':
      callback(value, <Links links={['https://pt.linkedin.com/in/vascoagaspar', 'https://github.com/vascogaspar']}/>);
      break;

    case 'contact':
    case 'Contact':
      callback(value, 'opening email client...');
      window.location.href = `mailto:${CONST.EMAIL}`;
      break;

    case 'copyright':
    case 'Copyright':
      callback(value, '© ' + new Date() + ' kthxbye');
      break;

    case 'work':
    case 'Work':
      callback(value, <Table header={tableHeader} body={tableBody} description="Some of my latest projects include:" />);
      break;

    case 'bio':
    case 'Bio':
    case 'about':
    case 'About':
      callback(value, 'I used to be a drummer.')
      break;

    case '':
      callback('', '')
      break;

    default:
      callback(value, <Error value={'-oops "'+ value +'": command was not found. Try writing "help" or "commands"'} />)
  }
};

module.exports = Commands;
