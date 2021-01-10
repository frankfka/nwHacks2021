import axios from 'axios';
import React, { MutableRefObject, useState, useEffect } from 'react';

const endpoint = 'http://localhost:8000/extract';

interface Props {
    textRef: MutableRefObject<HTMLDivElement | null>;
}

const getImportantText = (text: string) => {
  const [importantText, setImportantText] = useState(null);

  useEffect(() => {
    const fetchImportantText = async () => {
      const res = await axios.post(endpoint, { text: text });
      setImportantText(res.data);
    };

    fetchImportantText();
  }, [text]);

  return importantText;
};


export const TestImportantText: React.FC<Props> = ({ textRef }: Props) => {
    console.log(textRef);
  if (!textRef.current) return <div>"hi1"</div>;
  const text = textRef.current.textContent;
  if (!text) return <div>"hi"</div>;
  const importantText = getImportantText(text);

  if (!importantText) return null;

  console.log(importantText);
  return <div>{JSON.stringify(importantText)}</div>;
};

export default getImportantText;