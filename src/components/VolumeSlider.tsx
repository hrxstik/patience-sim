import React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import ICookies from '../cookies';

/** "Retro" slider. */
const CustomSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '0',
    borderRadius: '0%',
    '&:hover': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    height: 8,
    borderRadius: 0,
    border: '0',
    backgroundColor: '#fff',
  },
  '& .MuiSlider-rail': {
    height: 8,
    borderRadius: 0,
    backgroundColor: '#fff',
  },
});

/** Changes music volume.
 * @param audioRef An HTMLAudioElement from MusicPlayer.
 * @extends MusicPlayer
 * @component
 */
const VolumeSlider: React.FC<{
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}> = ({ audioRef }) => {
  const [cookies, setCookie] = useCookies<string>(['music-volume']);
  const [value, setValue] = React.useState<number>(
    cookies['music-volume'] ? parseFloat(cookies['music-volume']) : 0.3,
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    if (audioRef.current) {
      audioRef.current.volume = newValue as number;
      setCookie('music-volume', newValue.toString(), { path: '/' });
    }
  };

  React.useEffect(() => {
    handleChange(
      new Event(''),
      cookies['music-volume'] ? parseFloat(cookies['music-volume']) : 0.3,
    );
  }, []);

  return (
    <div>
      <CustomSlider value={value} onChange={handleChange} min={0} max={1} step={0.01} />
    </div>
  );
};

export default VolumeSlider;
