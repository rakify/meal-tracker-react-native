import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isLogout: false,
  },
  reducers: {
    //Login
    loginStart: state => {
      state.isFetching = true;
      state.isLogout = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: state => {
      state.isFetching = false;
      state.error = true;
      state.isLogout = true;
    },
    //Logout
    logoutStart: state => {
      state.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.isLogout = true;
      state.currentUser = null;
      state.error = false;
    },
    logoutFailure: state => {
      state.isFetching = false;
      state.error = true;
    },

    //Update
    updateUserStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    //Get
    getUserStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    getUserFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
