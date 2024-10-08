import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

/** */
export type TLeader = {
  id: string;
  name: string;
  score: number;
};

/** */
export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

/** */
interface ILeaderBoardState {
  leaders: TLeader[];
  status: Status;
}

/** */
const initialState: ILeaderBoardState = {
  leaders: [],
  status: Status.PENDING,
};

/** */
export const fetchLeaders = createAsyncThunk<TLeader[]>('leaders/fetchLeaders', async () => {
  const { data } = await axios.get<TLeader[]>(
    `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/leaders?&sortBy=score&order=desc`,
  );
  return data;
});

/** */
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

/** */
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
      .addCase(fetchLeaders.pending, (state) => {
        state.status = Status.PENDING;
        state.leaders = [];
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.leaders = action.payload;
      })
      .addCase(fetchLeaders.rejected, (state) => {
        state.status = Status.ERROR;
        state.leaders = [];
      });
  },
});

/** */
export const selectLeaderBoardSlice = (state: RootState) => state.leaderBoard;

export const { setLeaders } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
