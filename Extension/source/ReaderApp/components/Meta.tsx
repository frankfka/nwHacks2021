import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { browser } from 'webextension-polyfill-ts';
import { RuntimeMessageType } from '../../Common/runtimeMessage';

async function getHead(): Promise<HTMLHeadElement> {
  return browser.runtime.sendMessage({
    type: RuntimeMessageType.GET_META,
  });
}

const Meta: React.FC = () => {
  const { status, data, error } = useQuery('head', getHead);

  useEffect(() => {
    if (!data) return;
    const pageTitle = data.match(`<title>(.*)</title>`)?.[1];
    if (pageTitle) {
      const titleEl = document.createElement('title');
      titleEl.innerHTML = `Curated - ${pageTitle}`;
      window.document.head.appendChild(titleEl);
    }
  }, [data]);

  if (data) return null;
  return <></>;
};

export default Meta;
