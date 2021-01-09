import * as React from 'react';
import {useQuery, QueryClient, QueryClientProvider} from 'react-query';
import {browser} from 'webextension-polyfill-ts';
import {ParsedDocument} from '../../Common/parsedDocument';
import {RuntimeMessageType} from '../../Common/runtimeMessage';
import ReaderApp from './ReaderApp';

const queryClient = new QueryClient();

async function getParsedDocument(): Promise<ParsedDocument> {
  return browser.runtime.sendMessage({
    type: RuntimeMessageType.GET_PARSED_DOC,
  });
}

export default function ReaderAppContainer(): JSX.Element {
  const {status, data, error} = useQuery('parsedDocument', getParsedDocument);
  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'error' || !data) {
    console.error('Error fetching parsed document', error);
    return <div>Error</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReaderApp parsedDocument={data} />
    </QueryClientProvider>
  );
}
