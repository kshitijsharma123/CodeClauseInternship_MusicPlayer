import React from "react";
import { IoAddCircleOutline } from "react-icons/io5"; 

const MusicCard = ({ title, artist, imageUrl,openCreatePlaylist,id }) => {
  const handleClick=()=>{
    openCreatePlaylist(true,id)
  }
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg relative">
      <img className="w-full" src={imageUrl} alt="Album Art" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">{artist}</p>
      </div>
      
      <div className="absolute bottom-0 right-0 m-3 ">
        <IoAddCircleOutline  onClick={handleClick}/>
      </div>
    </div>
  );
};

export default MusicCard;
