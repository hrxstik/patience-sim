import React from 'react';
import HoldButton from './components/HoldButton';
import MusicPlayer from './components/MusicPlayer';
import Stats from './components/Stats';
import LeaderBoard from './components/LeaderBoard';
import Greeting from './components/Greeting';

/** */
interface RecordContextType {
  userName: string;
  isUserNameSet: boolean;
  record: number;
  setRecord: React.Dispatch<React.SetStateAction<number>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setIsUserNameSet: React.Dispatch<React.SetStateAction<boolean>>;
}

/** */
export const RecordContext = React.createContext<RecordContextType>({
  userName: 'Player',
  isUserNameSet: false,
  record: 0,
  setRecord: () => {},
  setUserName: () => {},
  setIsUserNameSet: () => {},
});

const App: React.FC = () => {
  const [record, setRecord] = React.useState(0);
  const [userName, setUserName] = React.useState('Player');
  const [isUserNameSet, setIsUserNameSet] = React.useState(false);
  return (
    <div className="App">
      <RecordContext.Provider
        value={{ userName, isUserNameSet, record, setRecord, setUserName, setIsUserNameSet }}>
        {!isUserNameSet ? (
          <Greeting />
        ) : (
          <>
            <LeaderBoard />
            <HoldButton />
            <div className="left-bottom-corner">
              <Stats />
              <MusicPlayer />
            </div>
          </>
        )}
      </RecordContext.Provider>
    </div>
  );
};

export default App;
