import { encode, split } from './commandUtils';

export let commands = {
  docs: 'https://docs.expo.io/',
  expo: 'https://github.com/expo/expo',
  universe: 'https://github.com/expo/universe',
  'expo-cli': 'https://github.com/expo/expo-cli',

  tw: (arg) => 'https://twitter.com/search?q=' + encode(arg),

  add: (arg) => {
    let addends = split(arg).map(parseFloat);
    let sum = 0;
    for (let x of addends) {
      sum += x;
    }
    return ['text', sum];
  },
};
