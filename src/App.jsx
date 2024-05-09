import React, { useEffect, useState } from "react";
import data from "./data.json";
import MusicCard from "./MusicCard";
import AudioPlayer from "./AudioPlayer";
import { IoIosCloseCircleOutline } from "react-icons/io";

function App() {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSong, setCurrentSongs] = useState("");
  const [songName, setSongName] = useState("");
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [songId, setSongId] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [playlists, setPlaylists] = useState([]);

  const playSong = (e, a, c) => {
    setCurrentSongs(e);
    setSongName(a);
    setId(c);
  };

  const createPlaylistBox = () => {
    setIsOpen(false);
  };

  const handleSkipForwardCallback = (newId) => {
    setId(newId);
  };
  const handleSkipBackwordCallback = (newId) => {
    setId(newId);
  };
  const openPlaylist = (e, id) => {
    setIsOpen(e);
    setSongId(id);
  };

  useEffect(() => {
    const { audioUrl, title } = data[id];
    setCurrentSongs(audioUrl);
    setSongName(title);
  }, [id]);

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };


  const handleChange = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const createPlaylist = () => {
    if (newPlaylistName.trim() !== "") {

      const existingPlaylist = playlists.find((playlist) => playlist.name === newPlaylistName);
  
      if (existingPlaylist) {
      
        const updatedPlaylist = {
          ...existingPlaylist,
          songs: [...existingPlaylist.songs, songId],
        };
  
       
        const updatedPlaylists = playlists.map((playlist) =>
          playlist.name === newPlaylistName ? updatedPlaylist : playlist
        );
  
        setPlaylists(updatedPlaylists);
        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
      } else {
       
        const newPlaylist = {
          name: newPlaylistName,
          songs: [songId], 
        };
  
      
        const updatedPlaylists = [...playlists, newPlaylist];
  
        setPlaylists(updatedPlaylists);
        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
      }
  
      
      setNewPlaylistName("");
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
    }

  }, []);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Music Player</h1>
        <ul>
          <li className="py-2 cursor-pointer font-semibold hover:bg-gray-700">
            Playlists
          </li>
       
          {playlists.map((playlist, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer font-semibold hover:bg-gray-700 pl-4"
          
            >
              {playlist.name}
            
            </li>
          ))}
        </ul>
      </div>
    </div>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md z-50">
          <input
            type="text"
            placeholder="Playlist Name"
            value={newPlaylistName}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          />
          <button
            onClick={createPlaylist}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Create Playlist
          </button>
          <IoIosCloseCircleOutline
            className="absolute top-0 right-0 m-3 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
      <div className="bg-gray-200 p-10 flex flex-wrap justify-between">
        {data.map((e, index) => (
          <>
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
                id={e.id}
                className="h-full"
                openCreatePlaylist={openPlaylist}
              />
            </div>
          </>
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
