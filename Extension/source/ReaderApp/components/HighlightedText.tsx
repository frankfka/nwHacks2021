import React from 'react';
import { FaHighlighter } from 'react-icons/fa';

interface Props {
  range?: Selection;
  parentEl: HTMLDivElement | undefined;
}

const getViewportPositionOffset = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
};

const HighlightedText: React.FC<Props> = ({ range, parentEl }: Props) => {
  if (!range || !parentEl) return null;
  const text = range?.toString();
  if (text.length < 5) return null;

  const oRange = range.getRangeAt(0); // get the text range
  const oRect = oRange.getBoundingClientRect();

  const parentPositionOffset = getViewportPositionOffset(parentEl);

  return (
    <button
      className="absolute z-10 rounded shadow p-4 bg-gray-50 text-lg duration-200 hover:bg-gray-100"
      style={{
        top: oRect.top - parentPositionOffset.top + oRect.height,
        left: oRect.left - parentPositionOffset.left + oRect.width / 2,
      }}
      type="button"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="mr-2">
        <FaHighlighter fill="#F59E0B" style={{ display: 'inline-block' }} />
      </span>
      Save Highlight
    </button>
  );
};

export default HighlightedText;
