import { NowRequest, NowResponse } from '@now/node';

let myCommands = {
  expo: 'https://github.com/expo/expo',
  universe: 'https://github.com/expo/universe',
  'expo-cli': 'https://github.com/expo/expo-cli',
};

function encode(arg) {
  return encodeURIComponent(arg).replace(/%20/g, '+');
}

let defaultCommands = {
  about: 'https://github.com/ccheever/bunny2/blob/master/README.md',
  yt: (arg) => 'https://www.youtube.com/results?search_query=' + encode(arg),
  wp: (arg) => 'https://en.wikipedia.org/w/index.php?search=' + encode(arg),
};

let commands = { ...defaultCommands, ...myCommands };

export default (req: NowRequest, res: NowResponse) => {
  let q: string = '' + req.query.q || '';
  let cmd = q.split(/\s/, 1)[0] || '';
  let arg = q.substr(cmd.length).trim(); // res.status(307);

  let goto;
  switch (typeof commands[cmd]) {
    case 'string':
      goto = commands[cmd];
      break;
    case 'function':
      goto = commands[cmd](arg);
      break;
    default:
      goto = 'https://www.google.com/search?q=' + encode(arg);
      break;
  }

  if (typeof goto === 'string') {
    res.setHeader('Location', goto);
    res.status(307);
    res.send('');
  } else if (Array.isArray(goto)) {
    switch (goto[0]) {
      case 'redirect':
        res.setHeader('Location', goto);
        res.status(307);
        res.send('');
      case 'json':
        res.json(goto[1]);
        break;
      case 'text':
        res.setHeader('Content-Type', 'text/plain');
        res.send(goto[1]);
      case 'html':
        res.send(goto[1]);
        break;
      case 'error':
      default:
        res.status(500);
        res.json(goto);
        break;
    }
  } else {
    res.status(500);
    res.json({ cmd, arg, q, error: 'Error: Unexpected result from command', goto });
  }
};
