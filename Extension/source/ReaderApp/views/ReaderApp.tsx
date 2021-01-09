import DOMPurify from 'dompurify';
import * as React from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { ParsedDocument } from '../../Common/parsedDocument';
import ReaderHeader from '../components/ReaderHeader';

interface ReaderAppProps {
  parsedDocument: ParsedDocument;
}

function transform(node: any, index: number) {
  if (node.type === 'tag' && node.name === 'div') {
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === 'tag' && node.name === 'img') {
    return null;
  }
  if (node.type === 'tag' && node.name === 'p') {
    return (
      <div className="text-lg my-4">
        {convertNodeToElement(node, index, transform)}
      </div>
    );
  }
  if (node.type === 'text') return node.data;
  return convertNodeToElement(node, index, transform);
}

export default function ReaderApp({
  parsedDocument,
}: ReaderAppProps): JSX.Element {
  const purifiedContent = DOMPurify.sanitize(parsedDocument.content, {
    USE_PROFILES: { html: true },
  });

  const parsedDoc = ReactHtmlParser(purifiedContent, { transform });

  return (
    <div id="reader-app">
      <ReaderHeader />
      <div className="container mx-auto my-32">
        {/* eslint-disable-next-line react/no-danger */}
        {parsedDoc}
      </div>
    </div>
  );
}
