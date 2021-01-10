import axios from 'axios';
import React, { useEffect, useState } from 'react';

const endpoint = 'http://localhost:8000/extract';

const getImportantText = (text: string | undefined) => {
  const [importantText, setImportantText] = useState<string[]>();

  useEffect(() => {
    if (!text) return;
    const fetchImportantText = async () => {
      const res = await axios.post(endpoint, { text: text });
      setImportantText(res.data.sentences);
    };

    fetchImportantText();
  }, [text]);

  return importantText;
};
interface Props {
  textEl: HTMLDivElement | undefined;
}

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
