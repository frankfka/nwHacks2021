import {browser} from 'webextension-polyfill-ts';
import processRuntimeMessage from './processRuntimeMessage';

console.log('Content script initialized!');
browser.runtime.onMessage.addListener(async (message) => {
  return processRuntimeMessage(message);
});

export {};
