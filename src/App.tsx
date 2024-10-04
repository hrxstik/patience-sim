import React from 'react';
import HoldButton from './components/HoldButton';
import MusicPlayer from './components/MusicPlayer';
import Stats from './components/Stats';

interface RecordContextType {
  record: number;
  setRecord: React.Dispatch<React.SetStateAction<number>>;
}

export const RecordContext = React.createContext<RecordContextType>({
  record: 0,
  setRecord: () => {},
});

function App() {
  const [record, setRecord] = React.useState(0);
  return (
    <div className="App">
      <RecordContext.Provider value={{ record, setRecord }}>
        <HoldButton />
        <div className="corner">
          <Stats />
          <MusicPlayer />
        </div>
      </RecordContext.Provider>
    </div>
  );
}

export default App;
