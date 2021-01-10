import { ParsedDocument } from './parsedDocument';

export enum RuntimeMessageType {
  INJECT_CONTENT = 'INJECT_CONTENT',
  PARSE_DOC = 'PARSE_DOC',
  PARSE_MOCK_DOC = 'PARSE_MOCK_DOC',
  PARSE_DOC_SUCCESS = 'PARSE_DOC_SUCCESS',
  GET_PARSED_DOC = 'GET_PARSED_DOC',
  GET_META = 'GET_META',
  GET_H1_TEXT = 'GET_H1_TEXT',
}

export interface RuntimeMessage {
  type: RuntimeMessageType;
}

export interface ParseDocumentSuccessMessage extends RuntimeMessage {
  parsed: ParsedDocument;
  meta: string;
  h1text: string;
}
