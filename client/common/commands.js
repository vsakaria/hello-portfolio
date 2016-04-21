import React from 'react';
import Links from '../components/Types/Links';
import List from '../components/Types/List';
import Table from '../components/Types/Table';
import Pepe from '../components/Ascii/Pepe';
import Benfica from '../components/Ascii/Benfica';
import CONST from './constants';

const cmds = ['clear', 'social', 'bio', 'work', 'copyright', 'source', 'contact'];
const alt_cmds = ['pepe', 'slb'];

const tableHeader = ['Project', 'Description', 'Date', 'Resources'];

const tableBody = [{
  title: 'Jeremy Venier',
  description: 'Website implementation for zen gardens',
  date: '2016',
  link: 'http://jeremyvenier.fr'
},{
  title: 'HOKO',
  description: 'Mobile deep linking platform. Was in charge of developing and designing interfaces for all communication channels',
  date: '2015 - 2016',
  link: 'http://hokolinks.com'
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

    case 'slb':
      callback(value, <Benfica/>)
      break;

    case 'pepe':
      // showPepe();
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

    case '':
      callback('', '')
      break;

    default:
      callback(value, '-sketelor: '+ value +': command was not found. Try writing "help" or "commands"')
  }
};

module.exports = Commands;
