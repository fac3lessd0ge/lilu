import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  _auth: string;
  tgid: number;
  hash: string;
}

const initialState: IUserState = {
  /*global Telegram*/
  // @ts-ignore
  hash: Telegram.WebApp.initDataUnsafe.hash || 'broken hash',
  tgid: Telegram.WebApp.initDataUnsafe.user?.id || 409093991,
  _auth: Telegram.WebApp.initData || 'broken initData',
};

export const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
