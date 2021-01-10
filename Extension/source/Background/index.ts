import 'emoji-log';
import { browser } from 'webextension-polyfill-ts';
import {
  ParseDocumentSuccessMessage,
  RuntimeMessage,
  RuntimeMessageType,
} from '../Common/runtimeMessage';
import { ParsedDocument } from '../Common/parsedDocument';

let parsedReaderDocument: ParsedDocument | undefined;
let docHead: string | undefined;
let h1text: string | undefined;

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
});

browser.runtime.onMessage.addListener(async (message: RuntimeMessage) => {
  console.log('Processing message in background script', message);
  if (message.type === RuntimeMessageType.PARSE_DOC_SUCCESS) {
    const launchReaderMessage = message as ParseDocumentSuccessMessage;
    // Update global reader document
    parsedReaderDocument = launchReaderMessage.parsed;
    docHead = launchReaderMessage.meta;
    h1text = launchReaderMessage.h1text;
    // Launch new tab
    await browser.tabs.create({
      url: 'options.html',
    });
    console.log('Updated parsed reader document', parsedReaderDocument);
  } else if (message.type === RuntimeMessageType.GET_PARSED_DOC)
    return parsedReaderDocument;
  else if (message.type === RuntimeMessageType.GET_META) {
    return docHead;
  } else if (message.type === RuntimeMessageType.GET_H1_TEXT) {
    return h1text;
  }

  return undefined;
});
