import React from 'react';
import { RecordContext } from '../App';
import {
  TLeader,
  addLeader,
  fetchLeaders,
  selectLeaderBoardSlice,
} from '../redux/slices/leaderBoardSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

/** */
const HoldButton: React.FC = () => {
  const [isHolding, setIsHolding] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const intervalId = React.useRef<NodeJS.Timeout | null>(null);
  const recordContext = React.useContext(RecordContext);
  const { leaders } = useSelector(selectLeaderBoardSlice);
  const dispatch = useAppDispatch();
  /** */
  function startTimer() {
    setIsHolding(true);
    setTimer(0);
    intervalId.current = setInterval(() => {
      setTimer((prev) => parseFloat((prev + 0.01).toFixed(2)));
    }, 10);
    return intervalId;
  }
  /** */
  function stopTimer() {
    if (isHolding) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      setIsHolding(false);
      const currentTimerValue = parseFloat(timer.toFixed(2));

      if (currentTimerValue > recordContext.record) {
        recordContext.setRecord(currentTimerValue);
        updateLeaderBoard(currentTimerValue);
      } else {
        recordContext.setRecord(recordContext.record);
      }
    }
  }
  /** */
  function updateLeaderBoard(currentScore: number) {
    const newLeader: TLeader = {
      id: String(leaders.length),
      name: recordContext.userName,
      score: currentScore,
    };
    dispatch(addLeader(newLeader)).then(() => dispatch(fetchLeaders()));
  }

  return (
    <div
      className={`holdButton ${isHolding ? 'isHolded' : ''}`}
      onMouseDown={startTimer}
      onMouseUp={stopTimer}
      onMouseLeave={stopTimer}>
      {isHolding ? timer.toFixed(2) + ' sec' : 'Play'}
    </div>
  );
};

export default HoldButton;
