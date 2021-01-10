import axios from 'axios';
import React, { useEffect, useState } from 'react';

const endpoint = 'http://localhost:8000/extract';

interface Props {
  textEl: HTMLDivElement | undefined;
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

export const TestImportantText: React.FC<Props> = ({ textEl }: Props) => {
  if (!textEl) return null;
  const text = textEl.textContent;
  if (!text) return <div>"hi"</div>;
  const importantText = getImportantText(text);

  if (!importantText) return null;

  console.log(importantText);
  return <div>{JSON.stringify(importantText)}</div>;
};

export default getImportantText;
