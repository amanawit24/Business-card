import React from 'react';

const ShareButton = () => {
  const shareUrl = window.location.href; // Current page URL
  const title = 'Your Website Title';

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div>
      <h2>Share this page:</h2>
      <button onClick={shareOnFacebook}>Share on Facebook</button>
      <button onClick={shareOnTwitter}>Share on Twitter</button>
      <button onClick={shareOnLinkedIn}>Share on LinkedIn</button>
    </div>
  );
};

export default ShareButton;
