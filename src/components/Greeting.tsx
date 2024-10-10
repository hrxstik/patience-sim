import React from 'react';
import { RecordContext } from '../App';
import { useCookies } from 'react-cookie';

const Greeting = () => {
  const recordContext = React.useContext(RecordContext);
  const [cookies, setCookie] = useCookies(['player-name']);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    recordContext.setUserName(event.target.value);
  };

  const startGame = () => {
    const isUserNameValid = recordContext.userName.trim() !== '';
    if (isUserNameValid) {
      recordContext.setIsUserNameSet(true);
      setCookie('player-name', recordContext.userName, { path: '/' });
    }
  };

  //Switch from greeting to game
  React.useEffect(() => {
    if (cookies['player-name'] || recordContext.isUserNameSet) {
      recordContext.setUserName(cookies['player-name']);
      recordContext.setIsUserNameSet(true);
    }
  }, [cookies, recordContext]);

  return (
    <div className="greeting">
      <h1>Please enter your username</h1>
      <input type="text" onChange={onChangeInput} value={recordContext.userName} />
      <div className="button" onClick={() => startGame()}>
        Start
      </div>
    </div>
  );
};

export default Greeting;
