import React from 'react';
import HoldButton from './components/HoldButton';
import MusicPlayer from './components/MusicPlayer';
import Stats from './components/Stats';
import LeaderBoard from './components/LeaderBoard';

interface RecordContextType {
  record: number;
  setRecord: React.Dispatch<React.SetStateAction<number>>;
}

export const RecordContext = React.createContext<RecordContextType>({
  record: 0,
  setRecord: () => {},
});

const App: React.FC = () => {
  const [record, setRecord] = React.useState(0);
  return (
    <div className="App">
      <RecordContext.Provider value={{ record, setRecord }}>
        <HoldButton />
        <div className="left-bottom-corner">
          <Stats />
          <MusicPlayer />
        </div>
        <LeaderBoard />
      </RecordContext.Provider>
    </div>
  );
};

export default App;
