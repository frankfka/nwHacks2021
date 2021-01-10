import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
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
    <section
      className="px-8 py-4 block bg-gray-50"
      style={{ width: '300px' }}
      id="popup"
    >
      <img
        src="/assets/curate-logo.png"
        className="object-contain w-48 h-16 mx-auto"
        alt="Curate"
      />
      <div className="block">
        <button
          className="px-8 py-2 w-full my-4 shadow rounded bg-blue-400 text-white mx-auto block"
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
          className="px-8 py-2 w-full my-4 shadow rounded bg-blue-400 text-white mx-auto block"
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
