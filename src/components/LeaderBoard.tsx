import React from 'react';
import { useAppDispatch } from '../redux/store';
import { TLeader, fetchLeaders, selectLeaderBoardSlice } from '../redux/slices/leaderBoardSlice';
import { useSelector } from 'react-redux';

const LeaderBoard = () => {
  const dispatch = useAppDispatch();
  const { leaders } = useSelector(selectLeaderBoardSlice);

  const leadersList = leaders.map((leader: TLeader) => {
    <p key={leader.id}>
      {leader.name}: {leader.score} sec.
    </p>;
  });

  React.useEffect(() => {
    dispatch(fetchLeaders());
  }, []);
  return (
    <div className="right-top-corner">
      <h2>LeaderBoard:</h2>
      {leadersList}
    </div>
  );
};

export default LeaderBoard;
