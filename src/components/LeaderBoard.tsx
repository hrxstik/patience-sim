import React from 'react';
import { useAppDispatch } from '../redux/store';
import { TLeader, getLeaders, selectLeaderBoardSlice } from '../redux/slices/leaderBoardSlice';
import { useSelector } from 'react-redux';

/** Displays 10 players with highest score sorted in descending order.
 *
 * @slice leaderBoardSlice
 * @component
 */
const LeaderBoard = () => {
  const dispatch = useAppDispatch();
  const { leaders } = useSelector(selectLeaderBoardSlice);

  React.useEffect(() => {
    dispatch(getLeaders());
  }, []);

  const leadersList = leaders.map((leader: TLeader, index: number) => {
    if (index < 10) {
      return (
        <p key={leader.id}>
          {leader.name}: {leader.score} sec.
        </p>
      );
    }
  });

  return (
    <div className="right-top-corner">
      <h2>LeaderBoard:</h2>
      {leadersList}
    </div>
  );
};

export default LeaderBoard;
