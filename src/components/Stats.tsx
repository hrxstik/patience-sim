import React from 'react';
import { RecordContext } from '../App';

/** */
const Stats = () => {
  const recordContext = React.useContext(RecordContext);
  return (
    <div className="stats">
      <p>Your name: {recordContext?.userName}</p>
      <p>Score: {recordContext?.record} sec</p>
    </div>
  );
};

export default Stats;
