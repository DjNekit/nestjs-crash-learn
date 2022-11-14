import { createSlice, SerializedError } from "@reduxjs/toolkit"
import { LoadingStates } from "../types"

interface ChatSliceState {
  loading: LoadingStates
  chats: any[],
  error: SerializedError | null
}

const initialState: ChatSliceState = {
  loading: LoadingStates.IDLE,
  chats: [],
  error: null
}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {}
})

export const { reset } = chatsSlice.actions