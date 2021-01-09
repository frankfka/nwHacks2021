import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import {
  ParseDocumentSuccessMessage,
  RuntimeMessage,
  RuntimeMessageType,
} from '../Common/runtimeMessage';
import {ParsedDocument} from '../Common/parsedDocument';

let parsedReaderDocument: ParsedDocument | undefined;

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
});

browser.runtime.onMessage.addListener(async (message: RuntimeMessage) => {
  console.log('Processing message in background script', message);
  if (message.type === RuntimeMessageType.PARSE_DOC_SUCCESS) {
    const launchReaderMessage = message as ParseDocumentSuccessMessage;
    // Update global reader document
    parsedReaderDocument = launchReaderMessage.parsed;
    // Launch new tab
    await browser.tabs.create({
      url: 'options.html',
    });
    console.log('Updated parsed reader document', parsedReaderDocument);
  } else if (message.type === RuntimeMessageType.GET_PARSED_DOC) {
    return parsedReaderDocument;
  }
  return undefined;
});
