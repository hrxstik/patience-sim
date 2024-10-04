import React from 'react';
import { RecordContext } from '../App';

const HoldButton: React.FC = () => {
  const [isHolding, setIsHolding] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | undefined>(undefined);
  const recordContext = React.useContext(RecordContext);
  function startTimer() {
    setIsHolding(true);
    setTimer(0);
    const intervalId = setInterval(() => {
      setTimer((prev) => parseFloat((prev + 0.01).toFixed(2)));
    }, 10);
    return intervalId;
  }

  function stopTimer(intervalId: NodeJS.Timeout | undefined) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsHolding(false);
    parseFloat(timer.toFixed(2)) > recordContext?.record
      ? recordContext?.setRecord(parseFloat(timer.toFixed(2)))
      : recordContext?.setRecord(recordContext?.record);
  }

  return (
    <div
      className={`holdButton ${isHolding ? 'isHolded' : ''}`}
      onMouseDown={() => setIntervalId(startTimer())}
      onMouseUp={() => stopTimer(intervalId)}
      onMouseOut={() => stopTimer(intervalId)}>
      {isHolding ? timer.toFixed(2) + ' sec' : 'Play'}
    </div>
  );
};

export default HoldButton;
