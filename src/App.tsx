import React from 'react';
import HoldButton from './components/HoldButton';
import MusicPlayer from './components/MusicPlayer';
import Stats from './components/Stats';
import LeaderBoard from './components/LeaderBoard';
import Greeting from './components/Greeting';
import { useCookies } from 'react-cookie';

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
  userName: '',
  isUserNameSet: false,
  record: 0,
  setRecord: () => {},
  setUserName: () => {},
  setIsUserNameSet: () => {},
});

const App: React.FC = () => {
  const [record, setRecord] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [isUserNameSet, setIsUserNameSet] = React.useState(false);
  const [cookies] = useCookies();

  React.useEffect(() => {
    if (cookies['player-name']) {
      setUserName(cookies['player-name']);
      setIsUserNameSet(true);
    }
    if (cookies['record']) {
      setRecord(cookies['record']);
    }
  }, [cookies]);

  return (
    <div className="App">
      <RecordContext.Provider
        value={{
          userName,
          isUserNameSet,
          record: record,
          setRecord,
          setUserName,
          setIsUserNameSet,
        }}>
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
