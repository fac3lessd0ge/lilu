import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  _auth: string;
  tgid: number;
  hash: string;
  username: string;
}

const initialState: IUserState = {
  /*global Telegram*/
  // @ts-ignore
  hash: Telegram.WebApp.initDataUnsafe.hash || '018166a6eb0c192a4e927bbffbea6a6f7312ebf3ee97548354b9bd40921eb0cd', // '018166a6eb0c192a4e927bbffbea6a6f7312ebf3ee97548354b9bd40921eb0cd'
  tgid: Telegram.WebApp.initDataUnsafe.user?.id || 475528761, // 475528761
  _auth: Telegram.WebApp.initData || 'query_id=AAE5_lccAAAAADn-Vxxi3FLW&user=%7B%22id%22%3A475528761%2C%22first_name%22%3A%22%D0%94%D0%B5%D0%BD%D0%B8%D1%81%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22chechkysh%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1677702645&hash=018166a6eb0c192a4e927bbffbea6a6f7312ebf3ee97548354b9bd40921eb0cd', // 'query_id=AAE5_lccAAAAADn-Vxxi3FLW&user=%7B%22id%22%3A475528761%2C%22first_name%22%3A%22%D0%94%D0%B5%D0%BD%D0%B8%D1%81%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22chechkysh%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1677702645&hash=018166a6eb0c192a4e927bbffbea6a6f7312ebf3ee97548354b9bd40921eb0cd'
  username: Telegram.WebApp.initDataUnsafe.user?.usernames || 'broken username',
};

export const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
