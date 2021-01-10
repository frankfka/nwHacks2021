import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

const ShareComponent: React.FC = () => {
  const url = 'https://nwhacks.com';

  return (
    <>
      <div className="relative px-4 py-2 shadow rounded bg-white flex flex-row space-x-4 mx-auto">
        <FacebookShareButton url={url}>
          <FacebookIcon size={24} />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={24} />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={24} />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <RedditIcon size={24} />
        </RedditShareButton>
      </div>
    </>
  );
};

export default ShareComponent;
