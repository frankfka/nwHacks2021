import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReaderAppContainer from './views/ReaderAppContainer';
import '../styles/tailwind.css';

const queryClient = new QueryClient();

export default function ReaderAppPage(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReaderAppContainer />
    </QueryClientProvider>
  );
}
