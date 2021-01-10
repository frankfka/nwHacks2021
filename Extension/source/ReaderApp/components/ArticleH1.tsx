import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { browser } from 'webextension-polyfill-ts';
import { RuntimeMessageType } from '../../Common/runtimeMessage';

async function getH1(): Promise<string> {
  return browser.runtime.sendMessage({
    type: RuntimeMessageType.GET_H1_TEXT,
  });
}

const ArticleH1: React.FC = () => {
  const { status, data, error } = useQuery('rawHtml', getH1);
  const [articleTitle, setArticleTitle] = useState('');

  useEffect(() => {
    if (!data) return;
    setArticleTitle(data);
  }, [data]);

  if (!data) return null;
  return <h1 className="text-4xl text-gray-800 font-semibold">{data}</h1>;
};

export default ArticleH1;
