import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

// 使用该类型定义初始 state
const initialState: UserState = {
  nickname: '',
  avatar: '',
  coins: 0,
  vip: false,
  token: undefined,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    logout: () => {
      console.log('init state');
      console.log(initialState);
      return initialState;
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    login: (state, action: PayloadAction<LoginUserState>) => {
      let payload = action.payload;
      state.avatar = payload.avatar;
      state.nickname = payload.nickname;
      state.coins = payload.coins;
      state.token = payload.token;
      state.vip = payload.vip;
      state.isLogin = true;
    },
  },
});

export const {logout, login} = userSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
