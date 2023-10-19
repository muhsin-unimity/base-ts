import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";
import { Rootstate } from "../../store/store";

interface InitialState {
  status: "loading" | "successfull" | "failed" | "idle";
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: InitialState = {
  status: "loading",
  token: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state, _action) => {
        if (state.status !== "loading") {
          state.status = "loading";
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "successfull";
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetch user failed";
      });
  },
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    //add user api call
    const result = {
      id: 123,
      firstName: "muhsin",
      lastName: "tt",
      email: "sample@email.com",
      createdAt: "",
      updatedAt: "",
    };
    return result;
  }
);

export const { logout } = userSlice.actions;

export const selectUser = (state: Rootstate) => state.user.user;
export const selectUserApiStatus = (state: Rootstate) => state.user.status;

export const userReducer = userSlice.reducer;
