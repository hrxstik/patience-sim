import React from 'react';
import VolumeSlider from './VolumeSlider';

/** */
const MusicPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  /** */
  const playAudio = () => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else if (audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="bgMusic.mp3" type="audio/mpeg" />
      </audio>
      <p>Volume</p>
      <VolumeSlider audioRef={audioRef} />
      <div className={`musicPlayer ${isPlaying ? 'reversed' : ''}`} onClick={() => playAudio()}>
        Music On
      </div>
    </div>
  );
};

export default MusicPlayer;
