import { configureStore } from '@reduxjs/toolkit';
import leaderBoard from './slices/leaderBoardSlice';
import { useDispatch } from 'react-redux';

/** Stores leaderboard slice.
 * @slice leaderBoardSlice.
 */
export const store = configureStore({
  reducer: { leaderBoard },
});

type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
