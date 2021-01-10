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
import { TestImportantText } from '../hooks/ExtractImportantSentences';
import ReadToMe from '../components/ReadToMe';

interface ReaderAppProps {
  parsedDocument: ParsedDocument;
}

export default function ReaderApp({
  parsedDocument,
}: ReaderAppProps): JSX.Element {
  const [highlightedRange, setHighlightedRange] = React.useState<Selection>();

  const [containerEl, setContainerEl] = React.useState<HTMLDivElement>();
  const containerRef = React.useCallback((node) => {
    if (node !== null) {
      setContainerEl(node);
    }
  }, []);

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
        <ReadToMe textEl={containerEl} />
      </ReaderHeader>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="container mx-auto my-32 relative">
        <TestImportantText textEl={containerEl} />
        <div
          ref={containerRef}
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
          <HighlightedText range={highlightedRange} parentEl={containerEl} />
        </div>
      </div>
    </div>
  );
}
