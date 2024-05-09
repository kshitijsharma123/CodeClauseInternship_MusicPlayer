import React, { useState, useEffect } from "react";
import { IoMdSkipForward, IoIosSkipBackward } from "react-icons/io";
import { IoPlay, IoPause } from "react-icons/io5";

import data from "./data.json";

const AudioPlayer = ({
  audioUrl,
  title,
  id,
  onSkipForward,
  onSkipBackward,
}) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // setName(title)

  const handleSeek = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    audio.currentTime = (newProgress / 100) * audio.duration;
  };
  const handleSkipBackward = () => {
    let newId = id - 1;
    if (newId === -1) newId = 6;
    onSkipBackward(newId);
  };

  const handleSkipForward = () => {
    let newId = id + 1;
    if (newId === 7) newId = 0;

    onSkipForward(newId);
  };

  useEffect(() => {
    const updateProgress = () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio]);

  useEffect(() => {
    audio.src = audioUrl;
    audio
      .play()
      .catch((err) => console.error("Error in playing the audio", err));
    setIsPlaying(true);
  }, [audio, audioUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white p-5 flex items-center justify-between">
      <div className="flex-shrink-0">
        <h1 className="font-semibold">{title}</h1>
      </div>

      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        {/* Play/Pause button */}
        <div className="flex justify-center">
          {isPlaying ? (
            <IoPause className="h-8 w-8 cursor-pointer " onClick={togglePlay} />
          ) : (
            <IoPlay className="h-8 w-8 cursor-pointer " onClick={togglePlay} />
          )}
        </div>

        {/* Skip Backward and Forward buttons with Timeline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IoIosSkipBackward
              className="h-6 w-6 cursor-pointer mr-2"
              onClick={handleSkipBackward}
            />
            <input
              type="range"
              className="w-72"
              value={progress}
              min="0"
              max="100"
              onChange={handleSeek}
            />
            <IoMdSkipForward
              className="h-6 w-6 cursor-pointer ml-2"
              onClick={handleSkipForward}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
