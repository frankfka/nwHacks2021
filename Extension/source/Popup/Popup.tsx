import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';

import './styles.scss';
import { RuntimeMessage, RuntimeMessageType } from '../Common/runtimeMessage';

async function sendMessageToActiveTab(
  message: RuntimeMessage
): Promise<unknown | undefined> {
  const activeTabQueryResult = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (
    !activeTabQueryResult ||
    activeTabQueryResult.length !== 1 ||
    !activeTabQueryResult[0].id
  ) {
    console.log('Unable to send message - no active tab found');
    return undefined;
  }
  return browser.tabs.sendMessage(activeTabQueryResult[0].id, message);
}

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>Curate</h2>
      <div className="flex flex-col">
        <button
          className="px-4 py-2 my-4 shadow rounded bg-blue-400 text-white mx-auto"
          type="button"
          onClick={async (): Promise<void> => {
            await sendMessageToActiveTab({
              type: RuntimeMessageType.PARSE_DOC,
            });
          }}
        >
          Launch Reader
        </button>
        <button
          className="px-4 py-2 my-4 shadow rounded bg-blue-400 text-white mx-auto"
          type="button"
          onClick={async (): Promise<void> => {
            await sendMessageToActiveTab({
              type: RuntimeMessageType.PARSE_MOCK_DOC,
            });
          }}
        >
          Launch Reader Sandbox
        </button>
      </div>
    </section>
  );
};

export default Popup;
