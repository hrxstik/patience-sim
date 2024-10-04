import React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

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

const VolumeSlider: React.FC<{
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}> = ({ audioRef }) => {
  const [value, setValue] = React.useState<number>(0.3);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    if (audioRef.current) {
      audioRef.current.volume = newValue as number;
    }
  };

  React.useEffect(() => {
    handleChange(new Event(''), 0.3);
  }, []);

  return (
    <div>
      <CustomSlider value={value} onChange={handleChange} min={0} max={1} step={0.01} />
    </div>
  );
};

export default VolumeSlider;
