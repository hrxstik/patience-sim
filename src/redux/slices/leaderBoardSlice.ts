import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

/**
 * @property {string} id - Players ID.
 * @property {string} name - Players username.
 * @property {number} score - Players high score.
 */
export type TLeader = {
  id: string;
  name: string;
  score: number;
};

/**
 * @member {string} PENDING
 * @member {string} SUCCESS
 * @member {string} ERROR
 */
enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * @interface ILeaderBoardState
 * @property {TLeader[]} leaders - Leaders list.
 * @property {Status} status - Leaderboard data status.
 */
interface ILeaderBoardState {
  leaders: TLeader[];
  status: Status;
}

/**
 * @type {ILeaderBoardState}
 * @property {TLeader[]} leaders - Leaders list.
 * @property {Status} status - Leaderboard data status.
 */
const initialState: ILeaderBoardState = {
  leaders: [],
  status: Status.PENDING,
};

/** Gets leaders' data from mockapi. */
export const getLeaders = createAsyncThunk<TLeader[]>('leaders/getLeaders', async () => {
  const { data } = await axios.get<TLeader[]>(
    `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/leaders?&sortBy=score&order=desc`,
  );
  return data;
});

/** Posts player's data to mockapi.
 * @param {TLeader} newLeader Player info.
 */
export const addLeader = createAsyncThunk<TLeader, TLeader>(
  'leaders/addLeader',
  async (newLeader) => {
    const { data } = await axios.post<TLeader>(
      `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/leaders`,
      newLeader,
    );
    return data;
  },
);

/** Stores leaders state.
 *  @slice leaderBoardSlice
 */
export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaders(state, action: PayloadAction<TLeader[]>) {
      state.leaders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaders.pending, (state) => {
        state.status = Status.PENDING;
        state.leaders = [];
      })
      .addCase(getLeaders.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.leaders = action.payload;
      })
      .addCase(getLeaders.rejected, (state) => {
        state.status = Status.ERROR;
        state.leaders = [];
      });
  },
});

/** Selects leaderBoardSlice
 * @slice leaderBoardSlice
 */
export const selectLeaderBoardSlice = (state: RootState) => state.leaderBoard;

export const { setLeaders } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
