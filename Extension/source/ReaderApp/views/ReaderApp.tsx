import { Element } from 'domhandler/lib/node';
import DOMPurify from 'dompurify';
import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from 'html-react-parser';
import * as React from 'react';
import { ParsedDocument } from '../../Common/parsedDocument';
import ReaderHeader from '../components/ReaderHeader';
import HighlightedText from '../components/HighlightedText';
import ReadToMe from '../components/ReadToMe';
interface ReaderAppProps {
  parsedDocument: ParsedDocument;
}

export default function ReaderApp({
  parsedDocument,
}: ReaderAppProps): JSX.Element {
  const [highlightedRange, setHighlightedRange] = React.useState<Selection>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const purifiedContent = DOMPurify.sanitize(parsedDocument.content, {
    USE_PROFILES: { html: true },
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        const tagName = domNode.name;
        const { children, attribs } = domNode;
        // Workaround for Typescript
        const domChildren = children as DOMNode[];

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
              {domToReact(domChildren, options)}
            </a>
          );
        }
        if (tagName === 'p')
          return (
            <p className="text-lg my-4">{domToReact(domChildren, options)}</p>
          );
      }
      return;
    },
  };

  const parsedElements = parse(purifiedContent, options);

  return (
    <div id="reader-app">
      <ReaderHeader>
        <ReadToMe textRef={containerRef} />
      </ReaderHeader>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
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
        {/* eslint-disable-next-line react/no-danger */}
        {parsedElements}
        <HighlightedText range={highlightedRange} parentRef={containerRef} />
      </div>
    </div>
  );
}
