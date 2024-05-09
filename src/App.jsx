import React, { useEffect, useState } from "react";
import data from "./data.json";
import MusicCard from "./MusicCard";
import AudioPlayer from "./AudioPlayer";

function App() {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSong, setCurrentSongs] = useState("");
  const [songName, setSongName] = useState("");
  const [id, setId] = useState(0);
  const playSong = (e, a, c) => {
    setCurrentSongs(e);
    setSongName(a);
    setId(c);
  };

  const handleSkipForwardCallback = (newId) => {
    setId(newId);
  };
  const handleSkipBackwordCallback = (newId) => {
    setId(newId);
    console.log(newId)

  };

  useEffect(() => {
    const { audioUrl, title } = data[id];
    setCurrentSongs(audioUrl);
    setSongName(title);
  }, [id]);

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Music Player</h1>
          <ul>
            <li
              className="py-2 cursor-pointer font-semibold hover:bg-gray-700"
              onClick={togglePlaylist}
            >
              Playlists
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 p-10 flex flex-wrap justify-between">
        {data.map((e, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2"
            onClick={() => playSong(e.audioUrl, e.title, e.id)}
          >
            <MusicCard
              title={e.title}
              artist={e.artist}
              audioUrl={e.audioUrl}
              imageUrl={e.imageUrl}
              className="h-full"
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-evenly items-center">
          {currentSong && (
            <AudioPlayer
              audioUrl={currentSong}
              title={songName}
              id={id}
              onSkipForward={handleSkipForwardCallback}
              onSkipBackward={handleSkipBackwordCallback}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
