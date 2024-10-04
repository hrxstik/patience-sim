import React from 'react';
import VolumeSlider from './VolumeSlider';

const MusicPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [volume, setVolume] = React.useState<number>(0.3);

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

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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
