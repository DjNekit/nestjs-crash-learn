import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { LoadingStates } from '../types';

interface AuthSliceState {
  accessToken: string
  loading: LoadingStates
  user: {
    name: string
    email: string
  } | null
  error: SerializedError | null
}

interface AuthPayload extends Pick<AuthSliceState, 'accessToken'>{}

const initialState: AuthSliceState = {
  accessToken: '',
  loading: LoadingStates.IDLE,
  user: null,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state: AuthSliceState, action: PayloadAction<AuthPayload>) => {
      state.accessToken = action.payload.accessToken
    },
    reset: () => initialState
  }
})

export const { updateAccessToken, reset } = authSlice.actions