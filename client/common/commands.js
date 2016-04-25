import React from 'react';
import Links from '../components/Types/Links';
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
    title: 'Jeremy Venier',
    description: 'Squaresplace implementation for this zen garden guy. Cool stuff.',
    date: '2016',
    link: 'http://jeremyvenier.fr'
  },
  {
    title: 'HOKO',
    description: 'Developed and designed this SaaS venture, mobile deep linking stuff. Go check it -->',
    date: '2015 - 2016',
    link: 'http://hokolinks.com'
  },
  {
    title: 'Glintt',
    description: 'Worked as a consultant for numerous clients in different areas, such as Bank, Insurance, Telecom, Transportations (among others)',
    date: '2012 - 2015',
    link: 'http://www.glintt.com'
  }
];

var Commands = function(value, callback, clear, showPepe) {
  switch (value) {
    case 'help':
    case '"help"':
    case 'commands':
    case '"commands"':
    case 'yes':
      callback(value, <List list={cmds} title="Here is the list of available commands you can try" />);
      break;

    case 'no':
      callback(value, 'k');
      break;

    case 'hello':
    case 'hello world':
      callback(value, 'Hello fellow human. Do you need any help?');
      break;

    case 'faggot':
    case 'fuck':
    case 'sex':
    case 'unicorn':
    case 'wtf':
      callback(value, <List list={alt_cmds} title="🔑 You've unlocked the secret commands!! 🔑" />);
      break;

    case 'clear':
      clear();
      break;

    case 'pwq':
    case 'pWq':
      callback(value, 'thats a nose');
      break;

    case 'slb':
      callback(value, <Benfica/>)
      break;

    case 'source':
      callback(value, <Link link="http://github.com/vascogaspar/hello-portfolio" before="You can find the source code of this website at"/>)
      break;

    case 'pepe':
      callback(value, <Pepe/>);
      break;

    case 'social':
      callback(value, <Links links={['https://pt.linkedin.com/in/vascoagaspar', 'https://github.com/vascogaspar']}/>);
      break;

    case 'contact':
      callback(value, 'opening email client...');
      window.location.href = `mailto:${CONST.EMAIL}`;
      break;

    case 'copyright':
      callback(value, '© ' + new Date() + ' kthxbye');
      break;

    case 'work':
      callback(value, <Table header={tableHeader} body={tableBody} />);
      break;

    case 'bio':
      callback(value, 'soon...')
      break;

    case '':
      callback('', '')
      break;

    default:
      callback(value, '-oops "'+ value +'": command was not found. Try writing "help" or "commands"')
  }
};

module.exports = Commands;
