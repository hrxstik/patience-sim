import React from 'react';
import { useAppDispatch } from '../redux/store';
import { TLeader, fetchLeaders, selectLeaderBoardSlice } from '../redux/slices/leaderBoardSlice';
import { useSelector } from 'react-redux';

/** */
const LeaderBoard = () => {
  const dispatch = useAppDispatch();
  const { leaders } = useSelector(selectLeaderBoardSlice);

  React.useEffect(() => {
    dispatch(fetchLeaders());
  }, [dispatch]);

  /** Nodelist of 10 or less JSX <p> elements. People with highest score.*/
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
