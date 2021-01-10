import React, { useState } from 'react';
import { FcReading } from 'react-icons/fc';
import getTextToSpeech from '../api/getTextToSpeech';

interface Props {
  textEl: HTMLDivElement | undefined;
}

const ReadToMe: React.FC<Props> = ({ textEl }: Props) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const onClickHandler = async () => {
    if (!textEl) return;
    const text = textEl.textContent;
    if (!text) return;

    if (!audio) {
      setIsTranslating(true);
      const { data, contentType } = await getTextToSpeech(text.slice(0, 4999));

      const audioFile = new Blob([data], { type: contentType });

      const audioEl = new Audio(window.URL.createObjectURL(audioFile));
      setAudio(audioEl);
      audioEl.play();
      setIsTranslating(false);
      setIsPlaying(true);
    }

    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      className="flex flex-row items-center px-4 py-2 rounded border-2 bg-gray-100 relative mx-auto text-sm duration-200 hover:bg-indigo-200"
      type="button"
      onClick={onClickHandler}
    >
      <FcReading style={{ display: 'inline-block' }} />
      <span className="ml-2">
        {isTranslating
          ? 'Translating...'
          : isPlaying
          ? 'Reading...'
          : 'Read To Me'}
      </span>
    </button>
  );
};

export default ReadToMe;
