import { Element, Text } from 'domhandler/lib/node';
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
import getImportantText from '../hooks/getImportantText';
import ReadToMe from '../components/ReadToMe';
import { FaHighlighter } from 'react-icons/fa';
import classNames from 'classnames';

interface ReaderAppProps {
  parsedDocument: ParsedDocument;
}

export default function ReaderApp({
  parsedDocument,
}: ReaderAppProps): JSX.Element {
  const [highlightedRange, setHighlightedRange] = React.useState<Selection>();
  const [containerEl, setContainerEl] = React.useState<HTMLDivElement>();
  const [articleText, setArticleText] = React.useState<string>();
  const [highlight, setHighlight] = React.useState(true);
  const importantText = getImportantText(articleText);

  const containerRef = React.useCallback((node) => {
    if (node !== null) {
      setContainerEl(node);
      const text = node.textContent;
      setArticleText(text);
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
        if (tagName === 'p') {
          return (
            <p className="text-lg my-4">{domToReact(domChildren, options)}</p>
          );
        }
      }
      if (domNode instanceof Text && domNode.data) {
        if (!highlight) return;
        const elText = domNode.data;
        if (!importantText) return;
        for (let i = 0; i < importantText?.length; i++) {
          const str = importantText[i];
          const formattedStr = str.replace(/\n\r/, '');
          if (elText.includes(formattedStr)) {
            return (
              <span
                className="font-semibold"
                style={{ backgroundColor: 'yellow' }}
              >
                {elText}
              </span>
            );
          }
        }
      }

      return;
    },
  };

  const parsedElements = parse(purifiedContent, options);

  return (
    <div id="reader-app">
      <ReaderHeader>
        <button
          type="button"
          onClick={() => setHighlight(!highlight)}
          className={classNames(
            'flex flex-row items-center px-4 py-2 rounded relative mx-auto text-lg shadow duration-200 ',
            {
              'bg-gray-50 hover:bg-gray-100': !highlight,

              ' bg-yellow-300 text-gray-800 hover:bg-yellow-200': highlight,
            }
          )}
        >
          {' '}
          <span className="mr-2">
            <FaHighlighter fill="#F59E0B" style={{ display: 'inline-block' }} />
          </span>
          Highlight
        </button>
        <ReadToMe textEl={containerEl} />
      </ReaderHeader>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="container mx-auto my-32 relative">
        {/* <TestImportantText textEl={containerEl} /> */}
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
