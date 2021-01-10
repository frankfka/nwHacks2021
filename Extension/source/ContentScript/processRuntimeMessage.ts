import { browser } from 'webextension-polyfill-ts';
import {
  ParseDocumentSuccessMessage,
  RuntimeMessage,
  RuntimeMessageType,
} from '../Common/runtimeMessage';
import parseDocumentArticle from './parseDocumentArticle';
import { mockCBCArticle } from '../data/mockCBCParsedArticle';

async function processParseDocMessage(): Promise<void> {
  console.log('Starting to parse document');
  const parsedArticle = parseDocumentArticle(window.document);
  if (parsedArticle) {
    const updateReaderDocMessage: ParseDocumentSuccessMessage = {
      type: RuntimeMessageType.PARSE_DOC_SUCCESS,
      parsed: parsedArticle,
      meta: window.document.head.innerHTML,
    };
    console.log('Sending success message', updateReaderDocMessage);
    await browser.runtime.sendMessage(updateReaderDocMessage);
    console.log('Parsed document and sent update');
  } else {
    console.error('Error parsing document - null returned');
  }
}

export default async function processRuntimeMessage(
  message: RuntimeMessage
): Promise<unknown | undefined> {
  console.log('Processing message in content script', message);
  if (message.type === RuntimeMessageType.PARSE_DOC) {
    await processParseDocMessage();
  } else if (message.type === RuntimeMessageType.PARSE_MOCK_DOC) {
    const updateReaderDocMessage: ParseDocumentSuccessMessage = {
      type: RuntimeMessageType.PARSE_DOC_SUCCESS,
      parsed: mockCBCArticle,
      meta: window.document.head.innerHTML,
    };
    console.log(
      'Sending success message with mock data',
      updateReaderDocMessage
    );
    await browser.runtime.sendMessage(updateReaderDocMessage);
  }
  return undefined;
}
