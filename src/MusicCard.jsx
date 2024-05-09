import React from "react";

function MusicCard(props) {
  const { title, artist, audioUrl, imageUrl } = props;
 

  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt="Album Art" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">{artist}</p>
     
      </div>
    </div>
  );
}

export default MusicCard;
