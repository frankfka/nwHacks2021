import React, { MutableRefObject } from 'react';
import getTextToSpeech from '../api/getTextToSpeech';
import { FcReading } from 'react-icons/fc';

interface Props {
  textRef: MutableRefObject<HTMLDivElement | null>;
}

const ReadToMe: React.FC<Props> = ({ textRef }: Props) => {
  const onClickHandler = async () => {
    if (!textRef?.current) return;
    const text = textRef.current.textContent;
    if (!text) return;

    // Limit of 5000 chars
    const { data, contentType } = await getTextToSpeech(text.slice(0, 4999));

    const audioFile = new Blob([data], { type: contentType });

    const audio = new Audio(window.URL.createObjectURL(audioFile));
    audio.play();
  };

  return (
    <button
      className="flex flex-row items-center px-4 py-2 rounded relative mx-auto text-lg shadow bg-gray-50 duration-200 hover:bg-gray-100"
      type="button"
      onClick={onClickHandler}
    >
      <FcReading style={{ display: 'inline-block' }} />
      <span className="ml-2">Read To Me</span>
    </button>
  );
};

export default ReadToMe;
