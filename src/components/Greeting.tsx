import React from 'react';
import { RecordContext } from '../App';
const Greeting = () => {
  const recordContext = React.useContext(RecordContext);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    recordContext.setUserName(event.target.value);
  };

  const checkName = () => {
    recordContext.userName !== ''
      ? recordContext.setIsUserNameSet(true)
      : recordContext.setIsUserNameSet(false);
    console.log(recordContext.isUserNameSet);
  };

  return (
    <div className="greeting">
      <h1>Please enter your username</h1>
      <input type="text" onChange={onChangeInput} value={recordContext.userName} />
      <div className="button" onClick={checkName}>
        Start
      </div>
    </div>
  );
};

export default Greeting;
