import { Element } from 'domhandler/lib/node';
import DOMPurify from 'dompurify';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import * as React from 'react';
import { ParsedDocument } from '../../Common/parsedDocument';
import ReaderHeader from '../components/ReaderHeader';
import HighlightedText from '../components/HighlightedText';
import { TestImportantText } from '../hooks/ExtractImportantSentences'

interface ReaderAppProps {
  parsedDocument: ParsedDocument;
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      const tagName = domNode.name;
      const { children, attribs } = domNode;

      if (tagName === 'img') {
        const { src, alt } = attribs;
        return (
          <div className="mx-auto" style={{ width: '400px' }}>
            <img src={src} alt={alt} className="w-full object-contain" />
          </div>
        );
      }
      if (tagName === 'a') {
        const { href } = attribs;
        return (
          <a className="underline" href={href}>
            {domToReact(children, options)}
          </a>
        );
      }
      if (tagName === 'p')
        return <p className="text-lg my-4">{domToReact(children, options)}</p>;
    }
  },
};

// function transform(node: any, index: number) {
//   if (node.type === 'tag' && node.name === 'div') {
//     return convertNodeToElement(node, index, transform);
//   }
//   if (node.type === 'tag' && node.name === 'img') {
//     return null;
//   }
//   if (node.type === 'tag' && node.name === 'p') {
//     return (
//       <div className="text-lg my-4">
//         {convertNodeToElement(node, index, transform)}
//       </div>
//     );
//   }
//   if (node.type === 'a' && node.name === 'a') {
//     return (
//       <div className="text-lg my-4">
//         {convertNodeToElement(node, index, transform)}
//       </div>
//     );
//   }

//   if (node.type === 'text') return node.data;
//   return convertNodeToElement(node, index, transform);
// }

export default function ReaderApp({
  parsedDocument,
}: ReaderAppProps): JSX.Element {
  const [highlightedRange, setHighlightedRange] = React.useState<Selection>();
  const containerRef = React.useRef<HTMLElement>();

  const purifiedContent = DOMPurify.sanitize(parsedDocument.content, {
    USE_PROFILES: { html: true },
  });

  const parsedElements = parse(purifiedContent, options);

  return (
    <div id="reader-app">
      <ReaderHeader />
      <div
        ref={containerRef}
        className="container mx-auto my-32 relative"
        onMouseUp={() => {
          const range = window.getSelection();
          if (range) {
            setHighlightedRange(range);
          } else setHighlightedRange(undefined);
        }}
        onMouseDown={() => setHighlightedRange(undefined)}
      >
        <TestImportantText/>
        {/* eslint-disable-next-line react/no-danger */}
        {parsedElements}
        <HighlightedText range={highlightedRange} parentRef={containerRef} />
      </div>
    </div>
  );
}
