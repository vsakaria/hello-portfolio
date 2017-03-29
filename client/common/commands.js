import React from 'react';
import Links from '../components/Types/Links';
import Error from '../components/Types/Error';
import List from '../components/Types/List';
import Link from '../components/Types/Link';
import Table from '../components/Types/Table';
import Pepe from '../components/Ascii/Pepe';
import Benfica from '../components/Ascii/Benfica';
import CONST from './constants';

const cmds = ['clear', 'social', 'bio', 'work', 'copyright', 'source', 'contact'];
const alt_cmds = ['pepe', 'slb'];

const tableHeader = ['Project', 'Description', 'Date', 'Resources'];

const tableBody = [{
    title: `Bike n' Connect`,
    description: 'React Native, Redux, Codepush',
    date: '2017',
    link: 'http://bikenconnect.com'
  },
  {
    title: `TTTism`,
    description: 'React, Redux, Ansible',
    date: '2016',
    link: 'http://tttism.com/'
  },
  {
    title: 'Connect Lisboa',
    description: 'Angular 2',
    date: '2016',
    link: 'http://connectlisboa.com'
  },
  {
    title: 'HOKO',
    description: 'Ruby on Rails',
    date: '2015',
    link: 'http://hokolinks.com'
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

    case 'faggot':
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

    case 'pwq':
    case 'pWq':
      callback(value, 'thats a nose');
      break;

    case 'slb':
    case 'Slb':
      callback(value, <Benfica/>)
      break;

    case 'source':
    case 'Source':
      callback(value, <Link link="http://github.com/vascogaspar/hello-portfolio" before="You can find the source code of this website at"/>)
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
      callback(value, <Table header={tableHeader} body={tableBody} description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />);
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
