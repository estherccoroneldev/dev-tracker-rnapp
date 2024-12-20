import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchUserData} from '../services/userService';

export interface User {
  login: string;
  id: number;
  avatar_url: string;
  repos_url: string;
  name: string;
  email?: string;
  bio: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

// Tipagem do estado
interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Estado inicial
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// exporting actions
export const {setUser, setStatus, setError} = userSlice.actions;

// async function to find a user by using the service created
export const fetchUser = (username: string) => async (dispatch: any) => {
  dispatch(setStatus('loading'));

  try {
    const user = await fetchUserData(username);
    dispatch(setUser(user));
    dispatch(setStatus('succeeded'));
  } catch (error: any) {
    dispatch(setError(error?.message));
    dispatch(setStatus('failed'));
  }
};

// exporting reducer to be used in the store
export default userSlice.reducer;
