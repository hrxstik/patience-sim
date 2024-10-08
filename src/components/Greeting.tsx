import React from 'react';
import { RecordContext } from '../App';
const Greeting = () => {
  const recordContext = React.useContext(RecordContext);
  const [start, setStart] = React.useState(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    recordContext.setUserName(event.target.value);
  };

  const startGame = () => {
    const isUserNameValid = recordContext.userName !== '';
    recordContext.setIsUserNameSet(isUserNameValid);
    setStart(isUserNameValid);
  };

  //Switch from greeting to game
  React.useEffect(() => {
    if (recordContext.userName && start) {
      recordContext.setIsUserNameSet(true);
    } else {
      recordContext.setIsUserNameSet(false);
    }
  }, [recordContext.userName]);

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
